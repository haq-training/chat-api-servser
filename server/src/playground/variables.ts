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
};