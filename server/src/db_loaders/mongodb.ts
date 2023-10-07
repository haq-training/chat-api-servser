/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { database } from '../config/appConfig';
import chatMessage from '../mongodb_models/chatMessage';
import chatMessageData from '../test_data/chat_message.json';

dotenv.config();

export const mongoLoader = async () => {
    await mongoose
        .connect(database.MONGODB.uri, {
            socketTimeoutMS: 1000,
        })
        .then(() => {
            console.log('Mongo DB connected ');
        })
        .then(async () => {
            if (process.env.NODE_ENV === 'development') {
                chatMessageData.forEach((element) =>
                    chatMessage.findOneAndUpdate(
                        element as any,
                        { element },
                        {
                            upsert: true,
                        }
                    )
                );
                console.log('Insert success');
            }
        })
        .catch((err) => {
            console.error('Failed connect Mongo DB', err);
            process.exit();
        });
    if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
    }
};
