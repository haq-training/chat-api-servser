import type { Sequelize } from 'sequelize';
import { block_relationship as _block_relationship } from './block_relationship';
import type { block_relationshipAttributes, block_relationshipCreationAttributes } from './block_relationship';
import { chat_members as _chat_members } from './chat_members';
import type { chat_membersAttributes, chat_membersCreationAttributes } from './chat_members';
import { chat_room as _chat_room } from './chat_room';
import type { chat_roomAttributes, chat_roomCreationAttributes } from './chat_room';
import { file as _file } from './file';
import type { fileAttributes, fileCreationAttributes } from './file';
import { follower_relationship as _follower_relationship } from './follower_relationship';
import type { follower_relationshipAttributes, follower_relationshipCreationAttributes } from './follower_relationship';
import { friend_relationship as _friend_relationship } from './friend_relationship';
import type { friend_relationshipAttributes, friend_relationshipCreationAttributes } from './friend_relationship';
import { users as _users } from './users';
import type { usersAttributes, usersCreationAttributes } from './users';

export {
  _block_relationship as block_relationship,
  _chat_members as chat_members,
  _chat_room as chat_room,
  _file as file,
  _follower_relationship as follower_relationship,
  _friend_relationship as friend_relationship,
  _users as users,
};

export type {
  block_relationshipAttributes,
  block_relationshipCreationAttributes,
  chat_membersAttributes,
  chat_membersCreationAttributes,
  chat_roomAttributes,
  chat_roomCreationAttributes,
  fileAttributes,
  fileCreationAttributes,
  follower_relationshipAttributes,
  follower_relationshipCreationAttributes,
  friend_relationshipAttributes,
  friend_relationshipCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const block_relationship = _block_relationship.initModel(sequelize);
  const chat_members = _chat_members.initModel(sequelize);
  const chat_room = _chat_room.initModel(sequelize);
  const file = _file.initModel(sequelize);
  const follower_relationship = _follower_relationship.initModel(sequelize);
  const friend_relationship = _friend_relationship.initModel(sequelize);
  const users = _users.initModel(sequelize);

  chat_members.belongsTo(chat_room, { as: 'chatRoom', foreignKey: 'chatRoomId'});
  chat_room.hasMany(chat_members, { as: 'chat_members', foreignKey: 'chatRoomId'});
  block_relationship.belongsTo(users, { as: 'idUser_user', foreignKey: 'idUser'});
  users.hasMany(block_relationship, { as: 'block_relationships', foreignKey: 'idUser'});
  block_relationship.belongsTo(users, { as: 'idBlock_user', foreignKey: 'idBlock'});
  users.hasMany(block_relationship, { as: 'idBlock_block_relationships', foreignKey: 'idBlock'});
  chat_members.belongsTo(users, { as: 'user', foreignKey: 'userId'});
  users.hasMany(chat_members, { as: 'chat_members', foreignKey: 'userId'});
  follower_relationship.belongsTo(users, { as: 'idUser_user', foreignKey: 'idUser'});
  users.hasMany(follower_relationship, { as: 'follower_relationships', foreignKey: 'idUser'});
  follower_relationship.belongsTo(users, { as: 'idFollower_user', foreignKey: 'idFollower'});
  users.hasMany(follower_relationship, { as: 'idFollower_follower_relationships', foreignKey: 'idFollower'});
  file.belongsTo(users, { as: 'uploadBy_user', foreignKey: 'uploadBy' });
  friend_relationship.belongsTo(users, { as: 'idUser_user', foreignKey: 'idUser'});
  users.hasMany(friend_relationship, { as: 'friend_relationships', foreignKey: 'idUser'});
  friend_relationship.belongsTo(users, { as: 'idFriend_user', foreignKey: 'idFriend'});
  users.hasMany(friend_relationship, { as: 'idFriend_friend_relationships', foreignKey: 'idFriend'});

  return {
    block_relationship,
    chat_members,
    chat_room,
    file,
    follower_relationship,
    friend_relationship,
    users,
  };
}
