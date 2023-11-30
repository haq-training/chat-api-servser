/* eslint-disable import/extensions,@typescript-eslint/no-unused-vars */
import { Sequelize } from 'sequelize';
import { database } from '../config/appConfig';
import { initModels } from '../db_models/init-models';
import users from '../test_data/users.json';
import friendShip from '../test_data/friendShip.json';
import historyFriendShip from '../test_data/historyFriendShip.json';
import chat_room_date from '../test_data/chat_room.json';
import chat_members from '../test_data/chat_member.json';

export const sequelize = new Sequelize(
    database.MYSQL.db_name,
    database.MYSQL.db_user,
    database.MYSQL.db_password,
    {
        ...database.MYSQL.option,
    }
);

const models = initModels(sequelize);

export const syncDatabase = async () => {
    console.log('process.env.SYNC_DATA: ', process.env.SYNC_DATA);
    if (
        process.env.NODE_ENV === 'development' &&
        process.env.SYNC_DATA === 'true'
    ) {
        const isForceSync = process.env.SYNC_DATA === 'true';
        await sequelize
            .sync({ force: isForceSync, alter: true })
            .then(() => {
                console.log('Database sync is done!');
            })
            .then(async () => {
                if (isForceSync) {
                    await models.users.bulkCreate(users as any);
                    await models.Friendship.bulkCreate(friendShip as any);
                    await models.HistoryFriendShip.bulkCreate(historyFriendShip as any);
                    await models.chat_room.bulkCreate(chat_room_date as any);
                    await models.chat_members.bulkCreate(chat_members as any);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

export * as db from '../db_models/init-models';
