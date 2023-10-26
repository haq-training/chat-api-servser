import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { FriendshipStatus, FriendshipStatusId } from './FriendshipStatus';

export interface FriendshipAttributes {
  RequesterId: number;
  AddresseeId: number;
  CreatedDateTime?: Date;
  id: number;
}

export type FriendshipPk = 'id';
export type FriendshipId = Friendship[FriendshipPk];
export type FriendshipOptionalAttributes = 'CreatedDateTime';
export type FriendshipCreationAttributes = Optional<FriendshipAttributes, FriendshipOptionalAttributes>;

export class Friendship extends Model<FriendshipAttributes, FriendshipCreationAttributes> implements FriendshipAttributes {
  RequesterId!: number;

  AddresseeId!: number;

  CreatedDateTime?: Date;

  id!: number;

  // Friendship belongsTo FriendshipStatus via RequesterId
  Requester!: FriendshipStatus;

  getRequester!: Sequelize.BelongsToGetAssociationMixin<FriendshipStatus>;

  setRequester!: Sequelize.BelongsToSetAssociationMixin<FriendshipStatus, FriendshipStatusId>;

  createRequester!: Sequelize.BelongsToCreateAssociationMixin<FriendshipStatus>;

  // Friendship belongsTo FriendshipStatus via AddresseeId
  Addressee!: FriendshipStatus;

  getAddressee!: Sequelize.BelongsToGetAssociationMixin<FriendshipStatus>;

  setAddressee!: Sequelize.BelongsToSetAssociationMixin<FriendshipStatus, FriendshipStatusId>;

  createAddressee!: Sequelize.BelongsToCreateAssociationMixin<FriendshipStatus>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Friendship {
    return Friendship.init({
    RequesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FriendshipStatus',
        key: 'id'
      }
    },
    AddresseeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FriendshipStatus',
        key: 'id'
      }
    },
    CreatedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
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
          { name: 'id' },
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
