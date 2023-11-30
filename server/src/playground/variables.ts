import { IChatRoomType } from '../__generated__/graphql';

const account = 'dvc123@gmail.com';
const password = '123456';

const userForLogin = 'userdemo@gmail.com';
const passwordForLogin = '123456';


export const variables = {
    login: {
        input: {
            account,
            password,
        },
    },
    register: {
        input: {
            email: userForLogin,
            password: passwordForLogin,
            firstName: 'user',
            lastName: 'demo',
            role: 1,
        },
    },
    updateUser: {
        input: {
            id : 1,
            firstName : 'update',
            lastName : 'demo-update',
            location : 'update-localtion',
            story : 'demo-story',
            avatar : null,
        },

    },
    upRoleUser: {
        id : 2
    },
    delete_user: {
        id : 5,
    },
    ChangePassword: {
        input: {
            id : 2,
            new_passWord : '98765',
            old_passWord : passwordForLogin
        },
    },
    forgot_password: {
        input: {
            gmail : 'dvc123@gmail.com'
        },
    },
    user: {
        id : 2
    },
    users: {
    },
    me: {
    },
    listFriend: {
    },
    addFriend: {
        email : 'nataliemayreed@live.com',
    },
    unFriend: {
        id : 3,
    },
    block_user: {
        id : 7,
    },
    unblock_user: {
        id : 7,
    },
    acceptFriend :{
        id : 2,
    },
    chatRoomList: {
        input: {
            userId: 1,
            type: IChatRoomType.Private,
        },
    },




};