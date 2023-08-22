import type { Sequelize } from 'sequelize';
import { chat_members as _chat_members } from './chat_members';
import type {
    chat_membersAttributes,
    chat_membersCreationAttributes,
} from './chat_members';
import { chat_room as _chat_room } from './chat_room';
import type {
    chat_roomAttributes,
    chat_roomCreationAttributes,
} from './chat_room';
import { contacts as _contacts } from './contacts';
import type {
    contactsAttributes,
    contactsCreationAttributes,
} from './contacts';
import { file as _file } from './file';
import type { fileAttributes, fileCreationAttributes } from './file';
import { users as _users } from './users';
import type { usersAttributes, usersCreationAttributes } from './users';

export {
    _chat_members as chat_members,
    _chat_room as chat_room,
    _contacts as contacts,
    _file as file,
    _users as users,
};

export type {
    chat_membersAttributes,
    chat_membersCreationAttributes,
    chat_roomAttributes,
    chat_roomCreationAttributes,
    contactsAttributes,
    contactsCreationAttributes,
    fileAttributes,
    fileCreationAttributes,
    usersAttributes,
    usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
    const chat_members = _chat_members.initModel(sequelize);
    const chat_room = _chat_room.initModel(sequelize);
    const contacts = _contacts.initModel(sequelize);
    const file = _file.initModel(sequelize);
    const users = _users.initModel(sequelize);

    chat_members.belongsTo(chat_room, {
        as: 'chatRoom',
        foreignKey: 'chatRoomId',
    });
    chat_room.hasMany(chat_members, {
        as: 'chat_members',
        foreignKey: 'chatRoomId',
    });
    chat_members.belongsTo(users, { as: 'user', foreignKey: 'userId' });
    users.hasMany(chat_members, { as: 'chat_members', foreignKey: 'userId' });
    contacts.belongsTo(users, { as: 'user', foreignKey: 'userId' });
    users.hasMany(contacts, { as: 'contacts', foreignKey: 'userId' });
    contacts.belongsTo(users, { as: 'friend', foreignKey: 'friendId' });
    users.hasMany(contacts, { as: 'friend_contacts', foreignKey: 'friendId' });
    file.belongsTo(users, { as: 'uploadBy_user', foreignKey: 'uploadBy' });
    users.hasMany(file, { as: 'files', foreignKey: 'uploadBy' });

    return {
        chat_members,
        chat_room,
        contacts,
        file,
        users,
    };
}
