import type { Sequelize } from 'sequelize';
import { Friendship as _Friendship } from './Friendship';
import type { FriendshipAttributes, FriendshipCreationAttributes } from './Friendship';
import { HistoryFriendShip as _HistoryFriendShip } from './HistoryFriendShip';
import type { HistoryFriendShipAttributes, HistoryFriendShipCreationAttributes } from './HistoryFriendShip';
import { chat_members as _chat_members } from './chat_members';
import type { chat_membersAttributes, chat_membersCreationAttributes } from './chat_members';
import { chat_room as _chat_room } from './chat_room';
import type { chat_roomAttributes, chat_roomCreationAttributes } from './chat_room';
import { file as _file } from './file';
import type { fileAttributes, fileCreationAttributes } from './file';
import { users as _users } from './users';
import type { usersAttributes, usersCreationAttributes } from './users';

export {
  _Friendship as Friendship,
  _HistoryFriendShip as HistoryFriendShip,
  _chat_members as chat_members,
  _chat_room as chat_room,
  _file as file,
  _users as users,
};

export type {
  FriendshipAttributes,
  FriendshipCreationAttributes,
  HistoryFriendShipAttributes,
  HistoryFriendShipCreationAttributes,
  chat_membersAttributes,
  chat_membersCreationAttributes,
  chat_roomAttributes,
  chat_roomCreationAttributes,
  fileAttributes,
  fileCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Friendship = _Friendship.initModel(sequelize);
  const HistoryFriendShip = _HistoryFriendShip.initModel(sequelize);
  const chat_members = _chat_members.initModel(sequelize);
  const chat_room = _chat_room.initModel(sequelize);
  const file = _file.initModel(sequelize);
  const users = _users.initModel(sequelize);

  HistoryFriendShip.belongsTo(Friendship, { as: 'Friendship', foreignKey: 'FriendshipID'});
  Friendship.hasMany(HistoryFriendShip, { as: 'HistoryFriendShips', foreignKey: 'FriendshipID'});
  chat_members.belongsTo(chat_room, { as: 'chatRoom', foreignKey: 'chatRoomId'});
  chat_room.hasMany(chat_members, { as: 'chat_members', foreignKey: 'chatRoomId'});
  Friendship.belongsTo(users, { as: 'Addressee', foreignKey: 'AddresseeId'});
  users.hasMany(Friendship, { as: 'Friendships', foreignKey: 'AddresseeId'});
  Friendship.belongsTo(users, { as: 'Requester', foreignKey: 'RequesterId'});
  users.hasMany(Friendship, { as: 'Requester_Friendships', foreignKey: 'RequesterId'});
  HistoryFriendShip.belongsTo(users, { as: 'Specifier', foreignKey: 'SpecifierId'});
  users.hasMany(HistoryFriendShip, { as: 'HistoryFriendShips', foreignKey: 'SpecifierId'});
  chat_members.belongsTo(users, { as: 'user', foreignKey: 'userId'});
  users.hasMany(chat_members, { as: 'chat_members', foreignKey: 'userId'});
  file.belongsTo(users, { as: 'uploadBy_user', foreignKey: 'uploadBy'});
  users.hasMany(file, { as: 'files', foreignKey: 'uploadBy'});

  return {
    Friendship,
    HistoryFriendShip,
    chat_members,
    chat_room,
    file,
    users,
  };
}
