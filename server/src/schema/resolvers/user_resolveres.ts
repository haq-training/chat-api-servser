// eslint-disable-next-line import/extensions,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions
import { ssmDb } from '../../loader/mysql';
import { IResolvers } from '../../__generated__/graphql';
import { ChatContext } from '../../server';
import { UserNotFoundError } from '../../lib/classes/graphqlErrors';

const userResolver: IResolvers = {
    Query: {
        me: async (_parent, _, context: ChatContext) => {},

        Mutation: {},
    },
};

export default userResolver;
