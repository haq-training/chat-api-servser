// eslint-disable-next-line import/extensions,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions
import bcrypt from 'bcrypt';
import { Transaction } from 'sequelize';
import { IResolvers } from '../../__generated__/graphql';
import { MySQLError, UserNotFoundError } from '../../lib/classes/graphqlErrors';
import { generateJWT, USER_JWT } from '../../lib/ultis/jwt';
import { db, sequelize } from '../../db_loaders/mysql';
import { storageConfig } from '../../config/appConfig';
import { minIOServices, pubsub_service } from '../../lib/classes';
import { ChatContext } from '../../server';
import { usersCreationAttributes } from '../../db_models/users';
import { DefaultHashValue } from '../../lib/enum';
import { checkAuthentication } from '../../lib/ultis/permision';
import { iRoleToNumber } from '../../lib/enum_resolvers';
import { IUserEvent, UserOnline } from '../../lib/classes/PubSubService';

const userResolver: IResolvers = {
    Query: {
        login: async (parent, { input }) => {
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

            const userInfo: USER_JWT = {
                id: user.id,
                email: user.email,
                avatarUrl: user.avatarUrl,
                firstName: user.firstName,
                lastName: user.lastName,
                status: user.status,
                location: user.location,
                story: user.story,
                role: user.role,
            };

            const token = generateJWT(userInfo);

            user.status = true;
            await user.save();
            const ids = await db.users
                .findAll({
                    where: {
                        status: true,
                    },
                })
                .then((users) => users.map((eachUser) => eachUser.id));
            const body = `${user.lastName} ${user.firstName} vừa online`;
            const message: UserOnline = {
                id: user.id,
                body,
            };
            pubsub_service.sendOnlineMessage(message, ids);
            return {
                user,
                token,
            };
        },
    },
    Mutation: {
        register: async (_parent, { input }, context: ChatContext) => {
            checkAuthentication(context);
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
                throw new Error();
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
    },
    Subscription: {
        onlineTracker: {
            subscribe: (parent, { userId }) =>
                pubsub_service.asyncIteratorByUser(
                    userId,
                    IUserEvent.OnlineTracker
                ),
            resolve: async (message: UserOnline) => message,
        },
    },
};

export default userResolver;
