// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import importGraphqlString from 'import-graphql-string';
import { Tab } from '@apollographql/graphql-playground-html/dist/render-playground-page';
import { variables } from './variables';
import userResolver from '../schema/resolvers/user_resolveres';

const setUserAuthorization = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const token = await userResolver.Query?.login({}, variables.login)
        .then((result: { token: any }) => result?.token)
        .catch((e: Error) => {
            console.error(e);
            return null;
        });
    const authHeader = token ? `Bearer ${token}` : '';

    return {
        authorization: authHeader,
    };
};

const defaultPath = `http://${process.env.SSM_SERVER_HOST || 'localhost'}:${
    process.env.SSM_SERVER_PORT || '4003'
}/graphql`;

const prettifyJsonString = (variable: any) => JSON.stringify(variable, null, 2);

const login = importGraphqlString('./queries/authentication/login.graphql');

const register = importGraphqlString('./mutations/register/register.graphql');

// const me = importGraphqlString('./queries/user/me.graphql');

export const queryExample = async (
    path: string = defaultPath
): Promise<Tab[]> => {
    const userAuth = await setUserAuthorization();

    return [
        {
            endpoint: path,
            name: 'Đăng nhập',
            query: login,
            variables: prettifyJsonString(variables.login),
        },
        {
            endpoint: path,
            name: 'Đăng ký',
            query: register,
            variables: prettifyJsonString(variables.register),
            headers: userAuth,
        },
    ];
};
