import { ApolloServer } from 'apollo-server';
import * as dotenv from 'dotenv';
// import { app, storageConfig } from './config/appConfig';
import { syncDatabase } from './db_loaders/mysql';
import { mongoLoader } from './db_loaders/mongodb';

dotenv.config();

async function startServer() {
    await Promise.all([syncDatabase(), mongoLoader()]);
}
startServer().catch((error) => {
    console.error('Unable start server: ', error);
});