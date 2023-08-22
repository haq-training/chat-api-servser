// eslint-disable-next-line import/extensions,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions
import bcrypt from 'bcrypt';
import { IResolvers } from '../../__generated__/graphql';
import { UserNotFoundError, MySQLError } from '../../lib/classes/graphqlErrors';
import { generateJWT, USER_JWT } from '../../lib/ultis/jwt';
import { db } from '../../db_loaders/mysql';

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
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                const token = generateJWT(user);
                return {
                    user,
                    token,
                };
            }
            throw new UserNotFoundError('Sai mật khẩu!!!');
        },
        // User: async (parent, { id }) =>
        //     await db.users.findByPk(id, {
        //         rejectOnEmpty: new UserNotFoundError(`User ID ${id} not found`),
        //     }),
        // Users: async () =>
        //     await db.users.findAll().catch((err) => {
        //         throw new err();
        //     }),
    },
    Mutation: {
        // register: async (parent, { input }) => {
        //     const {
        //         email,
        //         password,
        //         first_name,
        //         last_name,
        //         status,
        //         role,
        //         location,
        //         story,
        //         avatar_url,
        //         file,
        //     } = input;
        //     const user = await db.users.findOne({
        //         where: {
        //             email : ,
        //         },
        //         rejectOnEmpty: new UserNotFoundError(
        //             'Người dùng không tồn tại'
        //         ),
        //     });
        // },
    },
};

export default userResolver;
