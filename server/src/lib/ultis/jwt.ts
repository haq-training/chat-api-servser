import jwt from 'jsonwebtoken';
import { app } from '../../config/appConfig';

export interface USER_JWT {
    id: number;
    email: string;
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
    status: number;
    location?: string;
    story?: string;
    file?: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
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
