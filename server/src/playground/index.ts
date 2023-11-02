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

const updateUser = importGraphqlString('./mutations/user/update.graphql');
const ChangePassword = importGraphqlString(
    './mutations/changePassword/changePassword.graphql'
);
const forgot_password = importGraphqlString(
    './mutations/forgot_password/forgot_password.graphql'
);
const upRoleUser = importGraphqlString('./mutations/upRole/upRoleUser.graphql');
const user = importGraphqlString('./queries/me/user.graphql');
const users = importGraphqlString('./queries/me/users.graphql');
const listFriend = importGraphqlString('./queries/listFriend/listFriend.graphql');
const me = importGraphqlString('./queries/me/me.graphql');
const delete_user = importGraphqlString('./mutations/delete/delete.graphql');
const addFriend = importGraphqlString('./mutations/addFriend/addFriend.graphql');
const unFriend = importGraphqlString('./mutations/unFriend/unFriend.graphql');
const block_user = importGraphqlString('./mutations/block_user/block_user.graphql');

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
        },
        {
            endpoint: path,
            name: 'Sửa thông tin người dùng ',
            query: updateUser,
            variables: prettifyJsonString(variables.updateUser),
            headers: userAuth,
        },
        {
            endpoint: path,
            name: 'Đổi mật khẩu ',
            query: ChangePassword,
            variables: prettifyJsonString(variables.ChangePassword),
            headers: userAuth,
        },
        {
            endpoint: path,
            name: 'Quên mật khẩu',
            query: forgot_password,
            variables: prettifyJsonString(variables.forgot_password),
        },
        {
            endpoint: path,
            name: 'Get User',
            query: user,
            variables: prettifyJsonString(variables.user),
            headers: userAuth,
        },
        {
            endpoint: path,
            name: 'Get all User',
            query: users,
            variables: prettifyJsonString(variables.users),
            headers: userAuth,
        },
        {
            endpoint: path,
            name: 'Change Role User',
            query: upRoleUser,
            variables: prettifyJsonString(variables.upRoleUser),
            headers: userAuth,
        },
        {
            endpoint: path,
            name: 'profile',
            query: me,
            variables: prettifyJsonString(variables.me),
            headers: userAuth,
        },
        {
            endpoint: path,
            name: 'listFriend',
            query: listFriend,
            variables: prettifyJsonString(variables.listFriend),
            headers: userAuth,
        },
        {
            endpoint: path,
            name: 'delete user for admin',
            query: delete_user,
            variables: prettifyJsonString(variables.delete_user),
            headers: userAuth,
        },
        {
            endpoint: path,
            name: 'ket ban ',
            query: addFriend,
            variables: prettifyJsonString(variables.addFriend),
            headers: userAuth,
        },
        {
            endpoint: path,
            name: 'huy ket ban ',
            query: unFriend,
            variables: prettifyJsonString(variables.unFriend),
            headers: userAuth,
        },
        {
            endpoint: path,
            name: 'ket ban ',
            query: block_user,
            variables: prettifyJsonString(variables.block_user),
            headers: userAuth,
        },
    ];
};
