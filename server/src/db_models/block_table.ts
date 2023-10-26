import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { FriendshipStatus, FriendshipStatusId } from './FriendshipStatus';

export interface block_tableAttributes {
  RequesterId: number;
  AddresseeId: number;
  CreatedDateTime?: Date;
}

export type block_tablePk = 'RequesterId' | 'AddresseeId';
export type block_tableId = block_table[block_tablePk];
export type block_tableOptionalAttributes = 'CreatedDateTime';
export type block_tableCreationAttributes = Optional<block_tableAttributes, block_tableOptionalAttributes>;

export class block_table extends Model<block_tableAttributes, block_tableCreationAttributes> implements block_tableAttributes {
  RequesterId!: number;

  AddresseeId!: number;

  CreatedDateTime?: Date;

  // block_table belongsTo FriendshipStatus via RequesterId
  Requester!: FriendshipStatus;

  getRequester!: Sequelize.BelongsToGetAssociationMixin<FriendshipStatus>;

  setRequester!: Sequelize.BelongsToSetAssociationMixin<FriendshipStatus, FriendshipStatusId>;

  createRequester!: Sequelize.BelongsToCreateAssociationMixin<FriendshipStatus>;

  // block_table belongsTo FriendshipStatus via AddresseeId
  Addressee!: FriendshipStatus;

  getAddressee!: Sequelize.BelongsToGetAssociationMixin<FriendshipStatus>;

  setAddressee!: Sequelize.BelongsToSetAssociationMixin<FriendshipStatus, FriendshipStatusId>;

  createAddressee!: Sequelize.BelongsToCreateAssociationMixin<FriendshipStatus>;

  static initModel(sequelize: Sequelize.Sequelize): typeof block_table {
    return block_table.init({
    RequesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'FriendshipStatus',
        key: 'id'
      }
    },
    AddresseeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'FriendshipStatus',
        key: 'id'
      }
    },
    CreatedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'block_table',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'RequesterId' },
          { name: 'AddresseeId' },
        ]
      },
      {
        name: 'block_table_AddresseeId_RequesterId_unique',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'RequesterId' },
          { name: 'AddresseeId' },
        ]
      },
      {
        name: 'block_tableToAddressee_FK',
        using: 'BTREE',
        fields: [
          { name: 'AddresseeId' },
        ]
      },
    ]
  });
  }
}
