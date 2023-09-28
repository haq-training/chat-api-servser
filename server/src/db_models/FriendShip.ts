import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface FriendShipAttributes {
  idFriendShip: number;
  RequesterId: number;
  AddresseeId: number;
  createdAt?: Date;
}

export type FriendShipPk = 'idFriendShip';
export type FriendShipId = FriendShip[FriendShipPk];
export type FriendShipOptionalAttributes = 'createdAt';
export type FriendShipCreationAttributes = Optional<FriendShipAttributes, FriendShipOptionalAttributes>;

export class FriendShip extends Model<FriendShipAttributes, FriendShipCreationAttributes> implements FriendShipAttributes {
  idFriendShip!: number;

  RequesterId!: number;

  AddresseeId!: number;

  createdAt?: Date;

  // FriendShip belongsTo users via RequesterId
  Requester!: users;

  getRequester!: Sequelize.BelongsToGetAssociationMixin<users>;

  setRequester!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createRequester!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // FriendShip belongsTo users via AddresseeId
  Addressee!: users;

  getAddressee!: Sequelize.BelongsToGetAssociationMixin<users>;

  setAddressee!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createAddressee!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof FriendShip {
    return FriendShip.init({
    idFriendShip: {
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
    }
  }, {
    sequelize,
    tableName: 'FriendShip',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'idFriendShip' },
        ]
      },
      {
        name: 'fk_FriendShip_1_idx',
        using: 'BTREE',
        fields: [
          { name: 'RequesterId' },
        ]
      },
      {
        name: 'fk_FriendShip_2_idx',
        using: 'BTREE',
        fields: [
          { name: 'AddresseeId' },
        ]
      },
    ]
  });
  }
}
