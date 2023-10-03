/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */

import bcrypt from 'bcrypt';
import { Transaction } from 'sequelize';
import { IResolvers,ISuccessResponse } from '../../__generated__/graphql';
import { MySQLError, UserNotFoundError,AuthenticationError } from '../../lib/classes/graphqlErrors';
import { generateJWT } from '../../lib/ultis/jwt';
import { db, sequelize } from '../../db_loaders/mysql';
import { storageConfig } from '../../config/appConfig';
import { minIOServices } from '../../lib/classes';
// import { ChatContext } from '../../server';
import { usersCreationAttributes } from '../../db_models/users';
import { DefaultHashValue } from '../../lib/enum';
// import { checkAuthentication } from '../../lib/ultis/permision';
import {iRoleToNumber} from '../../lib/enum_resolvers';

const userResolver: IResolvers = {
    Query: {
        // eslint-disable-next-line no-empty-pattern
        users: async (_parent,{}, context) => {
            if (!context.isAuth) throw new AuthenticationError(context.error);
            return await db.users.findAll().catch((error) => {
                throw new MySQLError(`Error: ${error.message}`);
            });
        },
        user: async (_parent, { id }, context) => {
            if (!context.isAuth) throw new AuthenticationError(context.error);
            return await db.users.findByPk(id, {
                rejectOnEmpty: new UserNotFoundError(`User ID ${id} not found`),
            });
        },
        login: async (_parent, { input }) => {
            const { account, password } = input;
            const user = await db.users.findOne({
                where: {
                    email: account,
                },
                rejectOnEmpty: new UserNotFoundError(
                    'Người dùng không tồn tại'
                ),
            });
            const checkPassword = bcrypt.compareSync(password, user.password);
            if (!checkPassword) {
                throw new UserNotFoundError('Sai mật khẩu!!!');
            }
            console.log('role',user.role);
            const token = generateJWT(user.email,user.id,user.role);
            return {
                token,
                user,
            };
        },
    },
    Mutation: {
        register: async (_parent, { input }) => {
            const {
                email,
                password,
                firstName,
                lastName,
                role,
                location,
                story,
                avatarUrl,
            } = input;
            const createdUser = await db.users.findOne({
                where: {
                    email,
                },
                rejectOnEmpty: false,
            });
            if (createdUser) {
                throw new Error('nguoi dung ton tai');
            }

            const salt = bcrypt.genSaltSync(DefaultHashValue.saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const userAttribute: usersCreationAttributes = {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: iRoleToNumber(role),
                location: location ?? undefined,
                story: story ?? undefined,
                changePassword : 0,
            };

            return await sequelize.transaction(async (t: Transaction) => {
                try {
                    const newUser = await db.users.create(userAttribute, {
                        transaction: t,
                    });
                    if (avatarUrl) {
                        const { createReadStream, filename, mimetype } =
                            await avatarUrl.file;
                        const fileStream = createReadStream();
                        const filePath = `avatar/users/${newUser.id}/${filename}`;
                        await minIOServices.upload(
                            storageConfig.minIO.devApp,
                            filePath,
                            fileStream,
                            mimetype
                        );
                        newUser.avatarUrl = filePath;
                        await newUser.save({ transaction: t });
                    }
                    return newUser;
                } catch (error) {
                    await t.rollback();
                    throw new MySQLError(
                        `Lỗi bất thường khi thao tác trong cơ sở dữ liệu: ${error}`
                    );
                }
            });
        },
        updateUser : async (_parent,{input},context)=>{
            const {user} = context;
            if(!context.isAuth) throw new UserNotFoundError(context.error);
            const {
                id,
                firstName,
                lastName,
                avatar,
                location,
                story,
            } = input;
            if(user.id !== id) throw new UserNotFoundError(context.error);

            const CheckUserUpdate = await db.users.findByPk(id, {
                rejectOnEmpty: new UserNotFoundError(),
            });
            CheckUserUpdate.firstName = firstName ?? CheckUserUpdate.firstName;
            CheckUserUpdate.lastName = lastName ?? CheckUserUpdate.lastName;
            CheckUserUpdate.location = location ?? CheckUserUpdate.location;
            CheckUserUpdate.story = story ?? CheckUserUpdate.story;
            const uploadAvatarProcess: any[] = [];
            if (avatar) {
                const { createReadStream, filename, mimetype } = await avatar.file;
                if (CheckUserUpdate.avatarUrl) {
                    const deletedOldAvatar = minIOServices.deleteObjects(
                        [CheckUserUpdate.avatarUrl],
                        storageConfig.minIO.devApp,
                    );
                    uploadAvatarProcess.push(deletedOldAvatar);
                }
                const fileStream = createReadStream();
                const filePath = `avatar/users/${user.id}/${filename}`;
                const uploadNewAvatar = minIOServices.upload(
                    storageConfig.minIO.devApp,
                    filePath,
                    fileStream,
                    mimetype
                );
                CheckUserUpdate.avatarUrl = filePath;
                uploadAvatarProcess.push(uploadNewAvatar);
            }

            await sequelize.transaction(async (t: Transaction) => {
                try {
                    await CheckUserUpdate.save({ transaction: t });
                    if (uploadAvatarProcess.length > 0) {
                        await Promise.all(uploadAvatarProcess);
                    }
                } catch (error) {
                    await t.rollback();
                    throw new MySQLError('Update User Fail');
                }
            });

            return ISuccessResponse.Success;
        },
        upRoleUser : async  (_parent ,{id} ,context)=>{
            const {user} = context;
            if (!context.isAuth) throw new AuthenticationError(context.error);
            if(user.role !== false) throw new Error('khong co quyen update role user');
            const CheckUserUpdate = await db.users.findByPk(id, {
                rejectOnEmpty: new UserNotFoundError(),
            });
            CheckUserUpdate.role = 0;
            await sequelize.transaction(async (t: Transaction) => {
                try {
                    await CheckUserUpdate.save({ transaction: t });
                } catch (error) {
                    await t.rollback();
                    throw new MySQLError('Update User Fail');
                }
            });
            return ISuccessResponse.Success;
        }

     },
};
export default userResolver;
