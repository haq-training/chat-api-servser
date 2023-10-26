/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */

import bcrypt from 'bcrypt';
import { Transaction,Op } from 'sequelize';
import { IResolvers, ISuccessResponse } from '../../__generated__/graphql';
import {
    MySQLError,
    UserNotFoundError,
    AuthenticationError,
    TaskNotAllowUpdateError,
    UserAlreadyExistError,
} from '../../lib/classes/graphqlErrors';
import { generateJWT } from '../../lib/ultis/jwt';
import { db, sequelize } from '../../db_loaders/mysql';
import { storageConfig } from '../../config/appConfig';
import { minIOServices } from '../../lib/classes';
// import { ChatContext } from '../../server';
import { usersCreationAttributes } from '../../db_models/users';
import {DefaultHashValue, StatusFriend} from '../../lib/enum';
import { checkAuthentication } from '../../lib/ultis/permision';
import { iRoleToNumber } from '../../lib/enum_resolvers';

const userResolver: IResolvers = {

    Query: {
        // eslint-disable-next-line no-empty-pattern
        users: async (_parent, {}, context) => {
            checkAuthentication(context);
            return await db.users.findAll().catch((error) => {
                throw new MySQLError(`Error: ${error.message}`);
            });
        },
        user: async (_parent, { id }, context) => {
            checkAuthentication(context);
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
            const token = generateJWT(user.email, user.id, user.role);
            return {
                token,
                user,
            };
        },
        // eslint-disable-next-line no-empty-pattern
        listFriend :async (_parent,{},context)=>{
            checkAuthentication(context);
            const {user} = context;
            const friendships = await db.Friendship.findAll({
                where: {
                    [Op.or]: [
                        { RequesterId: user.id },
                        { AddresseeId: user.id },
                    ],
                },
                attributes: [
                    [sequelize.literal('CASE WHEN `RequesterId` = :userId THEN `AddresseeId` ELSE `RequesterId` END'), 'friendId'],
                ],
                raw: true,
                replacements: { userId: user.id },
            });

            const friendIds = friendships.map(element => (element as unknown as { friendId: number }).friendId);
            const uniqueFriendIds = [...new Set(friendIds)];
            interface User {
                id: number;
                email: string
                firstName : string
                lastName : string
                avatarUrl : string
                status : boolean
                location: string
                story: string
            }
            const userInfos: User[] = [];
            async function fetchUserData(element : any) {
                return {
                    id: element.id,
                    email: element.email,
                    firstName : element.firstName,
                    lastName : element.lastName,
                    avatarUrl : element.avatarUrl,
                    status : element.status,
                    location: element.location,
                    story: element.story
                };
            }
            const promises = uniqueFriendIds.map(async (element) => {
                const userInfo = await db.users.findByPk(element);
                const userData = await fetchUserData(userInfo);
                return userData;
            });

             await Promise.all(promises)
                .then((userInfosData) => {
                    userInfos.push(...userInfosData);
                })
                .catch((error) => {
                    console.error(error);
                });
            return userInfos;
        },
        // eslint-disable-next-line no-empty-pattern
        me: async (_parent,{},context) => {
            checkAuthentication(context);
            const {user} = context;
            return await db.users.findByPk(user.id, {
                rejectOnEmpty: new UserNotFoundError(`User ID ${user.id} not found`),
            });
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
            if (!email || !password) {
                throw new Error('Email và mật khẩu không được để trống.');
            }
            const createdUser = await db.users.findOne({
                where: {
                    email,
                },
                rejectOnEmpty: false,
            });
            if (createdUser) {
                throw new UserAlreadyExistError();
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
                changePassword: 0,
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
        updateUser: async (_parent, { input }, context) => {
            const { user } = context;
            checkAuthentication(context);
            const { id, firstName, lastName, avatar, location, story } = input;
            if (user.id !== id) throw new AuthenticationError(context.error);

            const CheckUserUpdate = await db.users.findByPk(id, {
                rejectOnEmpty: new UserNotFoundError(),
            });
            CheckUserUpdate.firstName = firstName ?? CheckUserUpdate.firstName;
            CheckUserUpdate.lastName = lastName ?? CheckUserUpdate.lastName;
            CheckUserUpdate.location = location ?? CheckUserUpdate.location;
            CheckUserUpdate.story = story ?? CheckUserUpdate.story;
            const uploadAvatarProcess: any[] = [];
            if (avatar) {
                const { createReadStream, filename, mimetype } =
                    await avatar.file;
                if (CheckUserUpdate.avatarUrl) {
                    const deletedOldAvatar = minIOServices.deleteObjects(
                        [CheckUserUpdate.avatarUrl],
                        storageConfig.minIO.devApp
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
        upRoleUser: async (_parent, { id }, context) => {
            const { user } = context;
            checkAuthentication(context);
            if (user.role !== false)
                throw new UserNotFoundError(
                    'Bạn không có quyền thực hiện chức năng này'
                );
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
        },
        delete_user: async (_parent, { id }, context) => {
            checkAuthentication(context);
            const { user } = context;
            if (user.role !== false) throw new UserNotFoundError();
            const userDelete = await db.users.findByPk(id, {
                rejectOnEmpty: new UserNotFoundError(),
            });
            if(!userDelete){
                throw new UserNotFoundError;
            }
            return sequelize.transaction(async (t) => {
                try{
                    await db.Friendship.destroy({
                        where: {
                            [Op.or]: [
                                { RequesterId: parseInt(id,10) },
                                { AddresseeId: parseInt(id,10) },
                            ],
                        },
                        transaction: t,
                    });
                    await db.FriendshipStatus.destroy({
                        where: {
                            [Op.or]: [
                                { RequesterId: parseInt(id,10) },
                                { AddresseeId: parseInt(id,10) },
                            ],
                        },
                        transaction: t,
                    });
                    await db.users.destroy({
                        where: { id },
                        transaction: t,

                    });
                    return ISuccessResponse.Success;
                } catch (error) {
                    await t.rollback();
                    throw new MySQLError(
                        `Lỗi bất thường khi thao tác trong cơ sở dữ liệu: ${error}`
                    );
                }
            });
        },

        ChangePassword: async (_parent, { input }, context) => {
            checkAuthentication(context);
            const { user } = context;
            const { id, new_passWord, old_passWord } = input;
            if (user.id.toString() !== id)
                throw new UserNotFoundError(
                    'Bạn không có quyền thực hiện chức năng này'
                );
            const User_changPass = await db.users.findByPk(id, {
                rejectOnEmpty: new UserNotFoundError(),
            });
            const checkPassword = bcrypt.compareSync(
                old_passWord,
                User_changPass.password
            );
            if (!checkPassword) {
                throw new TaskNotAllowUpdateError('Password không đúng!');
            }

            const salt = bcrypt.genSaltSync(DefaultHashValue.saltRounds);
            User_changPass.password = bcrypt.hashSync(new_passWord, salt);
            await User_changPass.save();

            return ISuccessResponse.Success;
        },
        forgot_password: async (_parent, { input }) => {
            const { gmail } = input;
            const user_forgot = await db.users.findOne({
                where: {
                    email: gmail,
                },
                rejectOnEmpty: new UserNotFoundError(),
            });
            if (!user_forgot) throw new UserNotFoundError('Invalid User');
            user_forgot.changePassword = 1;
            await user_forgot.save();

            return ISuccessResponse.Success;
        },
        addFriend : async (_parent,{id},context)=>{
    checkAuthentication(context);
    const {user} = context;
    const user_add =  await db.users.findByPk(id,{
        rejectOnEmpty: new UserNotFoundError(),
    });
    if(user.id === parseInt(id,10)){
        throw new Error('khong the tu gui ket ban cho chinh minh');
    }
    const check_user = await db.FriendshipStatus.findOne({
        where: {
            RequesterId: parseInt(id,10),
            AddresseeId: user.id,
            SpecifiedDateTime: sequelize.literal(
                `(SELECT MAX(SpecifiedDateTime) FROM FriendshipStatus AS NestedFS
    WHERE NestedFS.RequesterId = FriendshipStatus.RequesterId
    AND NestedFS.AddresseeId = FriendshipStatus.AddresseeId)`
            ),
        },
        rejectOnEmpty: false,
    });
    if(check_user){
        if(check_user.StatusCode === StatusFriend.Requested){
            throw new Error(`${user_add.firstName  }da gui loi moi ket ban cho ban`);
        }
        if(check_user.StatusCode === StatusFriend.Blocked){
            throw new Error(`${user_add.firstName  }da block ban `);
        }
        if(check_user.StatusCode === StatusFriend.Accepted){
            throw new Error(`${user_add.firstName  } da la ban be`);
        }
    }
    await db.FriendshipStatus.create({
        RequesterId: user.id,
        AddresseeId : parseInt(id,10),
        StatusCode : StatusFriend.Requested,
        SpecifierId : user.id
    });
    return ISuccessResponse.Success;
},
        // makeFriend
    },
};
export default userResolver;