import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { HistoryFriendShip, HistoryFriendShipId } from './HistoryFriendShip';
import type { users, usersId } from './users';

export interface FriendshipAttributes {
  Id: number;
  RequesterId: number;
  AddresseeId: number;
  StatusCode: string;
  CreatedDateTime: Date;
}

export type FriendshipPk = 'Id';
export type FriendshipId = Friendship[FriendshipPk];
export type FriendshipOptionalAttributes = 'Id' | 'CreatedDateTime';
export type FriendshipCreationAttributes = Optional<FriendshipAttributes, FriendshipOptionalAttributes>;

export class Friendship extends Model<FriendshipAttributes, FriendshipCreationAttributes> implements FriendshipAttributes {
  Id!: number;

  RequesterId!: number;

  AddresseeId!: number;

  StatusCode!: string;

  CreatedDateTime!: Date;

  // Friendship hasMany HistoryFriendShip via FriendshipID
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

  // Friendship belongsTo users via AddresseeId
  Addressee!: users;

  getAddressee!: Sequelize.BelongsToGetAssociationMixin<users>;

  setAddressee!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createAddressee!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // Friendship belongsTo users via RequesterId
  Requester!: users;

  getRequester!: Sequelize.BelongsToGetAssociationMixin<users>;

  setRequester!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createRequester!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Friendship {
    return Friendship.init({
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RequesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    AddresseeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    StatusCode: {
      type: DataTypes.CHAR(1),
      allowNull: false
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
          { name: 'Id' },
        ]
      },
      {
        name: 'Friendship_Unique',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'AddresseeId' },
          { name: 'RequesterId' },
        ]
      },
      {
        name: 'FriendshipToRequester_FK',
        using: 'BTREE',
        fields: [
          { name: 'RequesterId' },
        ]
      },
    ]
  });
  }
}
