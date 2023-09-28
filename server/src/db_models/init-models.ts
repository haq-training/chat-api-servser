import type { Sequelize } from 'sequelize';
import { FriendShip as _FriendShip } from './FriendShip';
import type { FriendShipAttributes, FriendShipCreationAttributes } from './FriendShip';
import { FriendShipStatus as _FriendShipStatus } from './FriendShipStatus';
import type { FriendShipStatusAttributes, FriendShipStatusCreationAttributes } from './FriendShipStatus';
import { statusFriend as _statusFriend } from './statusFriend';
import type { statusFriendAttributes, statusFriendCreationAttributes } from './statusFriend';
import { users as _users } from './users';
import type { usersAttributes, usersCreationAttributes } from './users';

export {
  _FriendShip as FriendShip,
  _FriendShipStatus as FriendShipStatus,
  _statusFriend as statusFriend,
  _users as users,
};

export type {
  FriendShipAttributes,
  FriendShipCreationAttributes,
  FriendShipStatusAttributes,
  FriendShipStatusCreationAttributes,
  statusFriendAttributes,
  statusFriendCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const FriendShip = _FriendShip.initModel(sequelize);
  const FriendShipStatus = _FriendShipStatus.initModel(sequelize);
  const statusFriend = _statusFriend.initModel(sequelize);
  const users = _users.initModel(sequelize);

  FriendShipStatus.belongsTo(statusFriend, { as: 'statusFriend_statusFriend', foreignKey: 'statusFriend'});
  statusFriend.hasMany(FriendShipStatus, { as: 'FriendShipStatuses', foreignKey: 'statusFriend'});
  FriendShip.belongsTo(users, { as: 'Requester', foreignKey: 'RequesterId'});
  users.hasMany(FriendShip, { as: 'FriendShips', foreignKey: 'RequesterId'});
  FriendShip.belongsTo(users, { as: 'Addressee', foreignKey: 'AddresseeId'});
  users.hasMany(FriendShip, { as: 'Addressee_FriendShips', foreignKey: 'AddresseeId'});
  FriendShipStatus.belongsTo(users, { as: 'Requester', foreignKey: 'RequesterId'});
  users.hasMany(FriendShipStatus, { as: 'FriendShipStatuses', foreignKey: 'RequesterId'});
  FriendShipStatus.belongsTo(users, { as: 'Addressee', foreignKey: 'AddresseeId'});
  users.hasMany(FriendShipStatus, { as: 'Addressee_FriendShipStatuses', foreignKey: 'AddresseeId'});
  FriendShipStatus.belongsTo(users, { as: 'Specifier', foreignKey: 'SpecifierId'});
  users.hasMany(FriendShipStatus, { as: 'Specifier_FriendShipStatuses', foreignKey: 'SpecifierId'});

  return {
    FriendShip,
    FriendShipStatus,
    statusFriend,
    users,
  };
}
