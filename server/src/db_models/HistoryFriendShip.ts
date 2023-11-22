import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Friendship, FriendshipId } from './Friendship';
import type { users, usersId } from './users';

export interface HistoryFriendShipAttributes {
  Id: number;
  FriendshipID: number;
  RequesterId: number;
  AddresseeId: number;
  SpecifiedDateTime: Date;
  StatusCode: string;
  SpecifierId: number;
}

export type HistoryFriendShipPk = 'Id';
export type HistoryFriendShipId = HistoryFriendShip[HistoryFriendShipPk];
export type HistoryFriendShipOptionalAttributes = 'Id' | 'SpecifiedDateTime';
export type HistoryFriendShipCreationAttributes = Optional<HistoryFriendShipAttributes, HistoryFriendShipOptionalAttributes>;

export
class HistoryFriendShip extends Model<HistoryFriendShipAttributes, HistoryFriendShipCreationAttributes> implements HistoryFriendShipAttributes {
  Id!: number;

  FriendshipID!: number;

  RequesterId!: number;

  AddresseeId!: number;

  SpecifiedDateTime!: Date;

  StatusCode!: string;

  SpecifierId!: number;

  // HistoryFriendShip belongsTo Friendship via FriendshipID
  Friendship!: Friendship;

  getFriendship!: Sequelize.BelongsToGetAssociationMixin<Friendship>;

  setFriendship!: Sequelize.BelongsToSetAssociationMixin<Friendship, FriendshipId>;

  createFriendship!: Sequelize.BelongsToCreateAssociationMixin<Friendship>;

  // HistoryFriendShip belongsTo users via SpecifierId
  Specifier!: users;

  getSpecifier!: Sequelize.BelongsToGetAssociationMixin<users>;

  setSpecifier!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createSpecifier!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof HistoryFriendShip {
    return HistoryFriendShip.init({
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FriendshipID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Friendship',
        key: 'Id'
      }
    },
    RequesterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AddresseeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SpecifiedDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
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
          { name: 'Id' },
        ]
      },
      {
        name: 'Friendship_Unique',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'FriendshipID' },
          { name: 'SpecifiedDateTime' },
        ]
      },
      {
        name: 'HistoryFriendShipToSpecifier_FK',
        using: 'BTREE',
        fields: [
          { name: 'SpecifierId' },
        ]
      },
    ]
  });
  }
}
