import { ChatContext } from '../../server';
import { AuthenticationError } from '../classes/graphqlErrors';

export const checkAuthentication = (context: ChatContext) => {
    if (!context.isAuth && !context.user)
        throw new AuthenticationError(context.error);
};
