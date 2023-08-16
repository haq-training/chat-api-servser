/* eslint-disable import/extensions */
import mongoose, {ConnectOptions} from 'mongoose';
import { database } from '../config/appConfig';
import chatMessage from '../mongodb_models/mongodb_chat';
import chatMessageData from '../test_data/chat.json';

export const mongoLoader = async () => {
    await mongoose
        .connect(database.MONGODB.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
        .then(() => {
            console.log('Mongo DB connected ');
        })
        .then(async () => {
            if (process.env.NODE_ENV === 'development') {
                for (const element of chatMessageData) {
                    await chatMessage.findOneAndUpdate(
                        { _id: element._id },
                        element,
                        {
                            upsert: true,
                        }
                    );
                }
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
