import type { Sequelize } from 'sequelize';
import { Friendship as _Friendship } from './Friendship';
import type { FriendshipAttributes, FriendshipCreationAttributes } from './Friendship';
import { FriendshipStatus as _FriendshipStatus } from './FriendshipStatus';
import type { FriendshipStatusAttributes, FriendshipStatusCreationAttributes } from './FriendshipStatus';
import { block_table as _block_table } from './block_table';
import type { block_tableAttributes, block_tableCreationAttributes } from './block_table';
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
  _FriendshipStatus as FriendshipStatus,
  _block_table as block_table,
  _chat_members as chat_members,
  _chat_room as chat_room,
  _file as file,
  _users as users,
};

export type {
  FriendshipAttributes,
  FriendshipCreationAttributes,
  FriendshipStatusAttributes,
  FriendshipStatusCreationAttributes,
  block_tableAttributes,
  block_tableCreationAttributes,
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
  const FriendshipStatus = _FriendshipStatus.initModel(sequelize);
  const block_table = _block_table.initModel(sequelize);
  const chat_members = _chat_members.initModel(sequelize);
  const chat_room = _chat_room.initModel(sequelize);
  const file = _file.initModel(sequelize);
  const users = _users.initModel(sequelize);

  FriendshipStatus.belongsToMany(FriendshipStatus, { as: 'AddresseeId_FriendshipStatuses', through: block_table, foreignKey: 'RequesterId', otherKey: 'AddresseeId' });
  FriendshipStatus.belongsToMany(FriendshipStatus, { as: 'RequesterId_FriendshipStatuses', through: block_table, foreignKey: 'AddresseeId', otherKey: 'RequesterId' });
  Friendship.belongsTo(FriendshipStatus, { as: 'Requester', foreignKey: 'RequesterId'});
  FriendshipStatus.hasMany(Friendship, { as: 'Friendships', foreignKey: 'RequesterId'});
  Friendship.belongsTo(FriendshipStatus, { as: 'Addressee', foreignKey: 'AddresseeId'});
  FriendshipStatus.hasMany(Friendship, { as: 'Addressee_Friendships', foreignKey: 'AddresseeId'});
  block_table.belongsTo(FriendshipStatus, { as: 'Requester', foreignKey: 'RequesterId'});
  FriendshipStatus.hasMany(block_table, { as: 'block_tables', foreignKey: 'RequesterId'});
  block_table.belongsTo(FriendshipStatus, { as: 'Addressee', foreignKey: 'AddresseeId'});
  FriendshipStatus.hasMany(block_table, { as: 'Addressee_block_tables', foreignKey: 'AddresseeId'});
  chat_members.belongsTo(chat_room, { as: 'chatRoom', foreignKey: 'chatRoomId'});
  chat_room.hasMany(chat_members, { as: 'chat_members', foreignKey: 'chatRoomId'});
  FriendshipStatus.belongsTo(users, { as: 'Requester', foreignKey: 'RequesterId'});
  users.hasMany(FriendshipStatus, { as: 'FriendshipStatuses', foreignKey: 'RequesterId'});
  FriendshipStatus.belongsTo(users, { as: 'Addressee', foreignKey: 'AddresseeId'});
  users.hasMany(FriendshipStatus, { as: 'Addressee_FriendshipStatuses', foreignKey: 'AddresseeId'});
  FriendshipStatus.belongsTo(users, { as: 'Specifier', foreignKey: 'SpecifierId'});
  users.hasMany(FriendshipStatus, { as: 'Specifier_FriendshipStatuses', foreignKey: 'SpecifierId'});
  chat_members.belongsTo(users, { as: 'user', foreignKey: 'userId'});
  users.hasMany(chat_members, { as: 'chat_members', foreignKey: 'userId'});
  file.belongsTo(users, { as: 'uploadBy_user', foreignKey: 'uploadBy'});
  users.hasMany(file, { as: 'files', foreignKey: 'uploadBy'});

  return {
    Friendship,
    FriendshipStatus,
    block_table,
    chat_members,
    chat_room,
    file,
    users,
  };
}
