// eslint-disable-next-line import/extensions,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions
import bcrypt from 'bcrypt';
import { IResolvers } from '../../__generated__/graphql';
import { UserNotFoundError } from '../../lib/classes/graphqlErrors';
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
            return {
                user,
                token,
            };
        },
    },
    Mutation: {},
};

export default userResolver;
