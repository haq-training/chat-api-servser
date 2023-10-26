/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable linebreak-style */
import * as dotenv from 'dotenv';
import { Options } from 'sequelize';

dotenv.config();

export const app = {
    host: process.env.SERVER_HOST ,
    port: process.env.SERVER_PORT ,
    secretSign: process.env.SECRET || 'super-secret-training2023',
};

const mysql_option: Options = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
export const database = {
    MYSQL: {
        db_name: process.env.MYSQL_NAME || 'chat-mysql',
        db_user: process.env.MYSQL_USER || 'admin',
        db_password: process.env.MYSQL_PASSWORD || 'training2023PDC',
        option: mysql_option,
    },
    MONGODB: {
        uri: `mongodb://${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_NAME}`,
    },
};

export const storageConfig = {
    minIO: {
        domain: process.env.MINIO_DOMAIN || 'http://116.103.228.13:9001/',
        devApp: process.env.MINIO_BUCKET || 'dev-app',
        endPoint: process.env.MINIO_ENDPOINT || '116.103.228.13',
        port: parseInt(process.env.MINIO_PORT || '9000', 10),
        useSSL: process.env.MINIO_SSL === 'true',
        accessKey: process.env.MINIO_ACCESS || '',
        secretKey: process.env.MINIO_SECRET || '',
    },
};
