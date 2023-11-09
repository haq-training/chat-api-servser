import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { HistoryFriendShip, HistoryFriendShipId } from './HistoryFriendShip';
import type { users, usersId } from './users';

export interface FriendshipAttributes {
  RequesterId: number;
  AddresseeId: number;
  StatusCode: string;
  CreatedDateTime: Date;
}

export type FriendshipPk = 'RequesterId' | 'AddresseeId' | 'StatusCode';
export type FriendshipId = Friendship[FriendshipPk];
export type FriendshipOptionalAttributes = 'CreatedDateTime';
export type FriendshipCreationAttributes = Optional<FriendshipAttributes, FriendshipOptionalAttributes>;

export class Friendship extends Model<FriendshipAttributes, FriendshipCreationAttributes> implements FriendshipAttributes {
  RequesterId!: number;

  AddresseeId!: number;

  StatusCode!: string;

  CreatedDateTime!: Date;

  // Friendship belongsToMany Friendship via RequesterId and AddresseeId
  AddresseeId_Friendships!: Friendship[];

  getAddresseeId_Friendships!: Sequelize.BelongsToManyGetAssociationsMixin<Friendship>;

  setAddresseeId_Friendships!: Sequelize.BelongsToManySetAssociationsMixin<Friendship, FriendshipId>;

  addAddresseeId_Friendship!: Sequelize.BelongsToManyAddAssociationMixin<Friendship, FriendshipId>;

  addAddresseeId_Friendships!: Sequelize.BelongsToManyAddAssociationsMixin<Friendship, FriendshipId>;

  createAddresseeId_Friendship!: Sequelize.BelongsToManyCreateAssociationMixin<Friendship>;

  removeAddresseeId_Friendship!: Sequelize.BelongsToManyRemoveAssociationMixin<Friendship, FriendshipId>;

  removeAddresseeId_Friendships!: Sequelize.BelongsToManyRemoveAssociationsMixin<Friendship, FriendshipId>;

  hasAddresseeId_Friendship!: Sequelize.BelongsToManyHasAssociationMixin<Friendship, FriendshipId>;

  hasAddresseeId_Friendships!: Sequelize.BelongsToManyHasAssociationsMixin<Friendship, FriendshipId>;

  countAddresseeId_Friendships!: Sequelize.BelongsToManyCountAssociationsMixin;

  // Friendship belongsToMany Friendship via AddresseeId and RequesterId
  RequesterId_Friendships!: Friendship[];

  getRequesterId_Friendships!: Sequelize.BelongsToManyGetAssociationsMixin<Friendship>;

  setRequesterId_Friendships!: Sequelize.BelongsToManySetAssociationsMixin<Friendship, FriendshipId>;

  addRequesterId_Friendship!: Sequelize.BelongsToManyAddAssociationMixin<Friendship, FriendshipId>;

  addRequesterId_Friendships!: Sequelize.BelongsToManyAddAssociationsMixin<Friendship, FriendshipId>;

  createRequesterId_Friendship!: Sequelize.BelongsToManyCreateAssociationMixin<Friendship>;

  removeRequesterId_Friendship!: Sequelize.BelongsToManyRemoveAssociationMixin<Friendship, FriendshipId>;

  removeRequesterId_Friendships!: Sequelize.BelongsToManyRemoveAssociationsMixin<Friendship, FriendshipId>;

  hasRequesterId_Friendship!: Sequelize.BelongsToManyHasAssociationMixin<Friendship, FriendshipId>;

  hasRequesterId_Friendships!: Sequelize.BelongsToManyHasAssociationsMixin<Friendship, FriendshipId>;

  countRequesterId_Friendships!: Sequelize.BelongsToManyCountAssociationsMixin;

  // Friendship hasMany HistoryFriendShip via RequesterId
  HistoryFriendShips!: HistoryFriendShip[];

  getHistoryFriendShips!: Sequelize.HasManyGetAssociationsMixin<HistoryFriendShip>;

  setHistoryFriendShips!: Sequelize.HasManySetAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  addHistoryFriendShip!: Sequelize.HasManyAddAssociationMixin<HistoryFriendShip, HistoryFriendShipId>;

  addHistoryFriendShips!: Sequelize.HasManyAddAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  createHistoryFriendShip!: Sequelize.HasManyCreateAssociationMixin<HistoryFriendShip>;

  removeHistoryFriendShip!: Sequelize.HasManyRemoveAssociationMixin<HistoryFriendShip, HistoryFriendShipId>;

  removeHistoryFriendShips!: Sequelize.HasManyRemoveAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  hasHistoryFriendShip!: Sequelize.HasManyHasAssociationMixin<HistoryFriendShip, HistoryFriendShipId>;

  hasHistoryFriendShips!: Sequelize.HasManyHasAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  countHistoryFriendShips!: Sequelize.HasManyCountAssociationsMixin;

  // Friendship hasMany HistoryFriendShip via AddresseeId
  Addressee_HistoryFriendShips!: HistoryFriendShip[];

  getAddressee_HistoryFriendShips!: Sequelize.HasManyGetAssociationsMixin<HistoryFriendShip>;

  setAddressee_HistoryFriendShips!: Sequelize.HasManySetAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  addAddressee_HistoryFriendShip!: Sequelize.HasManyAddAssociationMixin<HistoryFriendShip, HistoryFriendShipId>;

  addAddressee_HistoryFriendShips!: Sequelize.HasManyAddAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  createAddressee_HistoryFriendShip!: Sequelize.HasManyCreateAssociationMixin<HistoryFriendShip>;

  removeAddressee_HistoryFriendShip!: Sequelize.HasManyRemoveAssociationMixin<HistoryFriendShip, HistoryFriendShipId>;

  removeAddressee_HistoryFriendShips!: Sequelize.HasManyRemoveAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  hasAddressee_HistoryFriendShip!: Sequelize.HasManyHasAssociationMixin<HistoryFriendShip, HistoryFriendShipId>;

  hasAddressee_HistoryFriendShips!: Sequelize.HasManyHasAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  countAddressee_HistoryFriendShips!: Sequelize.HasManyCountAssociationsMixin;

  // Friendship belongsTo users via RequesterId
  Requester!: users;

  getRequester!: Sequelize.BelongsToGetAssociationMixin<users>;

  setRequester!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createRequester!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // Friendship belongsTo users via AddresseeId
  Addressee!: users;

  getAddressee!: Sequelize.BelongsToGetAssociationMixin<users>;

  setAddressee!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createAddressee!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Friendship {
    return Friendship.init({
    RequesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    AddresseeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    StatusCode: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      primaryKey: true
    },
    CreatedDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'Friendship',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'RequesterId' },
          { name: 'AddresseeId' },
          { name: 'StatusCode' },
        ]
      },
      {
        name: 'Friendship_AddresseeId_RequesterId_unique',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'RequesterId' },
          { name: 'AddresseeId' },
        ]
      },
      {
        name: 'FriendshipToAddressee_FK',
        using: 'BTREE',
        fields: [
          { name: 'AddresseeId' },
        ]
      },
    ]
  });
  }
}
