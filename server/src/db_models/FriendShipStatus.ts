import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { statusFriend, statusFriendId } from './statusFriend';
import type { users, usersId } from './users';

export interface FriendShipStatusAttributes {
  idFriendShipStatus: number;
  RequesterId: number;
  AddresseeId: number;
  SpecifiedDateTime?: Date;
  SpecifierId: number;
  statusFriend: string;
}

export type FriendShipStatusPk = 'idFriendShipStatus';
export type FriendShipStatusId = FriendShipStatus[FriendShipStatusPk];
export type FriendShipStatusOptionalAttributes = 'SpecifiedDateTime';
export type FriendShipStatusCreationAttributes = Optional<FriendShipStatusAttributes, FriendShipStatusOptionalAttributes>;

export class FriendShipStatus extends Model<FriendShipStatusAttributes, FriendShipStatusCreationAttributes> implements FriendShipStatusAttributes {
  idFriendShipStatus!: number;

  RequesterId!: number;

  AddresseeId!: number;

  SpecifiedDateTime?: Date;

  SpecifierId!: number;

  statusFriend!: string;

  // FriendShipStatus belongsTo statusFriend via statusFriend
  statusFriend_statusFriend!: statusFriend;

  getStatusFriend_statusFriend!: Sequelize.BelongsToGetAssociationMixin<statusFriend>;

  setStatusFriend_statusFriend!: Sequelize.BelongsToSetAssociationMixin<statusFriend, statusFriendId>;

  createStatusFriend_statusFriend!: Sequelize.BelongsToCreateAssociationMixin<statusFriend>;

  // FriendShipStatus belongsTo users via RequesterId
  Requester!: users;

  getRequester!: Sequelize.BelongsToGetAssociationMixin<users>;

  setRequester!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createRequester!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // FriendShipStatus belongsTo users via AddresseeId
  Addressee!: users;

  getAddressee!: Sequelize.BelongsToGetAssociationMixin<users>;

  setAddressee!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createAddressee!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // FriendShipStatus belongsTo users via SpecifierId
  Specifier!: users;

  getSpecifier!: Sequelize.BelongsToGetAssociationMixin<users>;

  setSpecifier!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createSpecifier!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof FriendShipStatus {
    return FriendShipStatus.init({
    idFriendShipStatus: {
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
    SpecifiedDateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    SpecifierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    statusFriend: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'statusFriend',
        key: 'status'
      }
    }
  }, {
    sequelize,
    tableName: 'FriendShipStatus',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'idFriendShipStatus' },
        ]
      },
      {
        name: 'fk_FriendShipStatus_1_idx',
        using: 'BTREE',
        fields: [
          { name: 'RequesterId' },
        ]
      },
      {
        name: 'fk_FriendShipStatus_2_idx',
        using: 'BTREE',
        fields: [
          { name: 'AddresseeId' },
        ]
      },
      {
        name: 'fk_FriendShipStatus_3_idx',
        using: 'BTREE',
        fields: [
          { name: 'SpecifierId' },
        ]
      },
      {
        name: 'fk_FriendShipStatus_4_idx',
        using: 'BTREE',
        fields: [
          { name: 'statusFriend' },
        ]
      },
    ]
  });
  }
}
