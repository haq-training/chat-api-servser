import type { Sequelize } from 'sequelize';
import { FriendShip as _FriendShip } from './FriendShip';
import type { FriendShipAttributes, FriendShipCreationAttributes } from './FriendShip';
import { FriendShipStatus as _FriendShipStatus } from './FriendShipStatus';
import type { FriendShipStatusAttributes, FriendShipStatusCreationAttributes } from './FriendShipStatus';
import { chat_members as _chat_members } from './chat_members';
import type { chat_membersAttributes, chat_membersCreationAttributes } from './chat_members';
import { chat_room as _chat_room } from './chat_room';
import type { chat_roomAttributes, chat_roomCreationAttributes } from './chat_room';
import { file as _file } from './file';
import type { fileAttributes, fileCreationAttributes } from './file';
import { statusFriend as _statusFriend } from './statusFriend';
import type { statusFriendAttributes, statusFriendCreationAttributes } from './statusFriend';
import { users as _users } from './users';
import type { usersAttributes, usersCreationAttributes } from './users';

export {
  _FriendShip as FriendShip,
  _FriendShipStatus as FriendShipStatus,
  _chat_members as chat_members,
  _chat_room as chat_room,
  _file as file,
  _statusFriend as statusFriend,
  _users as users,
};

export type {
  FriendShipAttributes,
  FriendShipCreationAttributes,
  FriendShipStatusAttributes,
  FriendShipStatusCreationAttributes,
  chat_membersAttributes,
  chat_membersCreationAttributes,
  chat_roomAttributes,
  chat_roomCreationAttributes,
  fileAttributes,
  fileCreationAttributes,
  statusFriendAttributes,
  statusFriendCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const FriendShip = _FriendShip.initModel(sequelize);
  const FriendShipStatus = _FriendShipStatus.initModel(sequelize);
  const chat_members = _chat_members.initModel(sequelize);
  const chat_room = _chat_room.initModel(sequelize);
  const file = _file.initModel(sequelize);
  const statusFriend = _statusFriend.initModel(sequelize);
  const users = _users.initModel(sequelize);

  FriendShip.belongsTo(FriendShipStatus, { as: 'Requester', foreignKey: 'RequesterId'});
  FriendShipStatus.hasMany(FriendShip, { as: 'FriendShips', foreignKey: 'RequesterId'});
  FriendShip.belongsTo(FriendShipStatus, { as: 'Addressee', foreignKey: 'AddresseeId'});
  FriendShipStatus.hasMany(FriendShip, { as: 'Addressee_FriendShips', foreignKey: 'AddresseeId'});
  chat_members.belongsTo(chat_room, { as: 'chatRoom', foreignKey: 'chatRoomId'});
  chat_room.hasMany(chat_members, { as: 'chat_members', foreignKey: 'chatRoomId'});
  FriendShipStatus.belongsTo(statusFriend, { as: 'statusFriend_statusFriend', foreignKey: 'statusFriend'});
  statusFriend.hasMany(FriendShipStatus, { as: 'FriendShipStatuses', foreignKey: 'statusFriend'});
  FriendShipStatus.belongsTo(users, { as: 'Requester', foreignKey: 'RequesterId'});
  users.hasMany(FriendShipStatus, { as: 'FriendShipStatuses', foreignKey: 'RequesterId'});
  FriendShipStatus.belongsTo(users, { as: 'Addressee', foreignKey: 'AddresseeId'});
  users.hasMany(FriendShipStatus, { as: 'Addressee_FriendShipStatuses', foreignKey: 'AddresseeId'});
  FriendShipStatus.belongsTo(users, { as: 'Specifier', foreignKey: 'SpecifierId'});
  users.hasMany(FriendShipStatus, { as: 'Specifier_FriendShipStatuses', foreignKey: 'SpecifierId'});
  chat_members.belongsTo(users, { as: 'user', foreignKey: 'userId'});
  users.hasMany(chat_members, { as: 'chat_members', foreignKey: 'userId'});
  file.belongsTo(users, { as: 'uploadBy_user', foreignKey: 'uploadBy'});
  users.hasMany(file, { as: 'files', foreignKey: 'uploadBy'});

  return {
    FriendShip,
    FriendShipStatus,
    chat_members,
    chat_room,
    file,
    statusFriend,
    users,
  };
}
