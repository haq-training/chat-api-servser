import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Friendship, FriendshipId } from './Friendship';
import type { users, usersId } from './users';

export interface HistoryFriendShipAttributes {
  RequesterId: number;
  AddresseeId: number;
  SpecifiedDateTime: Date;
  StatusCode: string;
  SpecifierId: number;
}

export type HistoryFriendShipPk = 'RequesterId' | 'AddresseeId' | 'SpecifiedDateTime';
export type HistoryFriendShipId = HistoryFriendShip[HistoryFriendShipPk];
export type HistoryFriendShipOptionalAttributes = 'SpecifiedDateTime';
export type HistoryFriendShipCreationAttributes = Optional<HistoryFriendShipAttributes, HistoryFriendShipOptionalAttributes>;

export class HistoryFriendShip extends
    Model<HistoryFriendShipAttributes, HistoryFriendShipCreationAttributes> implements HistoryFriendShipAttributes {
  RequesterId!: number;

  AddresseeId!: number;

  SpecifiedDateTime!: Date;

  StatusCode!: string;

  SpecifierId!: number;

  // HistoryFriendShip belongsTo Friendship via RequesterId
  Requester!: Friendship;

  getRequester!: Sequelize.BelongsToGetAssociationMixin<Friendship>;

  setRequester!: Sequelize.BelongsToSetAssociationMixin<Friendship, FriendshipId>;

  createRequester!: Sequelize.BelongsToCreateAssociationMixin<Friendship>;

  // HistoryFriendShip belongsTo Friendship via AddresseeId
  Addressee!: Friendship;

  getAddressee!: Sequelize.BelongsToGetAssociationMixin<Friendship>;

  setAddressee!: Sequelize.BelongsToSetAssociationMixin<Friendship, FriendshipId>;

  createAddressee!: Sequelize.BelongsToCreateAssociationMixin<Friendship>;

  // HistoryFriendShip belongsTo users via SpecifierId
  Specifier!: users;

  getSpecifier!: Sequelize.BelongsToGetAssociationMixin<users>;

  setSpecifier!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createSpecifier!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof HistoryFriendShip {
    HistoryFriendShip.init({
    RequesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Friendship',
        key: 'RequesterId'
      }
    },
    AddresseeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Friendship',
        key: 'AddresseeId'
      }
    },
    SpecifiedDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    },
    StatusCode: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    SpecifierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'HistoryFriendShip',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'RequesterId' },
          { name: 'AddresseeId' },
          { name: 'SpecifiedDateTime' },
        ]
      },
      {
        name: 'HistoryFriendShip_AddresseeId_RequesterId_unique',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'RequesterId' },
          { name: 'AddresseeId' },
        ]
      },
      {
        name: 'HistoryFriendShipToSpecifier_FK',
        using: 'BTREE',
        fields: [
          { name: 'SpecifierId' },
        ]
      },
      {
        name: 'HistoryFriendShip_ibfk_2_idx',
        using: 'BTREE',
        fields: [
          { name: 'AddresseeId' },
        ]
      },
    ]
  });
    // HistoryFriendShip.belongsTo(Friendship, {
    //   foreignKey: {
    //     name: 'HistoryFriendShipToFriendship_FK',
    //     field: ['RequesterId', 'AddresseeId'],
    //   },
    //   as: 'HistoryFriendShip',
    // });
    return HistoryFriendShip;
  }
}
