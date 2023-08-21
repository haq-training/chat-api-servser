import jwt from 'jsonwebtoken';
import { app } from '../../config/appConfig';

export interface USER_JWT {
    id: number;
    email: string;
    password: string;
    avatar_url?: string;
    first_name?: string;
    last_name?: string;
    status: string;
    location?: string;
    story?: string;
    file?: string;
    role: string;
    created_at?: string;
    updated_at?: string;
}

export const generateJWT = (user: USER_JWT) => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign(
        {
            ...user,
            exp: parseInt((expirationDate.getTime() / 1000) as any, 10),
        },
        app.secretSign
    );
};
