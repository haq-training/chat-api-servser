import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Friendship, FriendshipId } from './Friendship';
import type { block_table, block_tableId } from './block_table';
import type { users, usersId } from './users';

export interface FriendshipStatusAttributes {
  id: number;
  RequesterId: number;
  AddresseeId: number;
  SpecifiedDateTime?: Date;
  StatusCode: string;
  SpecifierId: number;
}

export type FriendshipStatusPk = 'id';
export type FriendshipStatusId = FriendshipStatus[FriendshipStatusPk];
export type FriendshipStatusOptionalAttributes = 'id' | 'SpecifiedDateTime';
export type FriendshipStatusCreationAttributes = Optional<FriendshipStatusAttributes, FriendshipStatusOptionalAttributes>;

export class FriendshipStatus extends Model<FriendshipStatusAttributes, FriendshipStatusCreationAttributes> implements FriendshipStatusAttributes {
  id!: number;

  RequesterId!: number;

  AddresseeId!: number;

  SpecifiedDateTime?: Date;

  StatusCode!: string;

  SpecifierId!: number;

  // FriendshipStatus hasMany Friendship via RequesterId
  Friendships!: Friendship[];

  getFriendships!: Sequelize.HasManyGetAssociationsMixin<Friendship>;

  setFriendships!: Sequelize.HasManySetAssociationsMixin<Friendship, FriendshipId>;

  addFriendship!: Sequelize.HasManyAddAssociationMixin<Friendship, FriendshipId>;

  addFriendships!: Sequelize.HasManyAddAssociationsMixin<Friendship, FriendshipId>;

  createFriendship!: Sequelize.HasManyCreateAssociationMixin<Friendship>;

  removeFriendship!: Sequelize.HasManyRemoveAssociationMixin<Friendship, FriendshipId>;

  removeFriendships!: Sequelize.HasManyRemoveAssociationsMixin<Friendship, FriendshipId>;

  hasFriendship!: Sequelize.HasManyHasAssociationMixin<Friendship, FriendshipId>;

  hasFriendships!: Sequelize.HasManyHasAssociationsMixin<Friendship, FriendshipId>;

  countFriendships!: Sequelize.HasManyCountAssociationsMixin;

  // FriendshipStatus hasMany Friendship via AddresseeId
  Addressee_Friendships!: Friendship[];

  getAddressee_Friendships!: Sequelize.HasManyGetAssociationsMixin<Friendship>;

  setAddressee_Friendships!: Sequelize.HasManySetAssociationsMixin<Friendship, FriendshipId>;

  addAddressee_Friendship!: Sequelize.HasManyAddAssociationMixin<Friendship, FriendshipId>;

  addAddressee_Friendships!: Sequelize.HasManyAddAssociationsMixin<Friendship, FriendshipId>;

  createAddressee_Friendship!: Sequelize.HasManyCreateAssociationMixin<Friendship>;

  removeAddressee_Friendship!: Sequelize.HasManyRemoveAssociationMixin<Friendship, FriendshipId>;

  removeAddressee_Friendships!: Sequelize.HasManyRemoveAssociationsMixin<Friendship, FriendshipId>;

  hasAddressee_Friendship!: Sequelize.HasManyHasAssociationMixin<Friendship, FriendshipId>;

  hasAddressee_Friendships!: Sequelize.HasManyHasAssociationsMixin<Friendship, FriendshipId>;

  countAddressee_Friendships!: Sequelize.HasManyCountAssociationsMixin;

  // FriendshipStatus belongsToMany FriendshipStatus via RequesterId and AddresseeId
  AddresseeId_FriendshipStatuses!: FriendshipStatus[];

  getAddresseeId_FriendshipStatuses!: Sequelize.BelongsToManyGetAssociationsMixin<FriendshipStatus>;

  setAddresseeId_FriendshipStatuses!: Sequelize.BelongsToManySetAssociationsMixin<FriendshipStatus, FriendshipStatusId>;

  addAddresseeId_FriendshipStatus!: Sequelize.BelongsToManyAddAssociationMixin<FriendshipStatus, FriendshipStatusId>;

  addAddresseeId_FriendshipStatuses!: Sequelize.BelongsToManyAddAssociationsMixin<FriendshipStatus, FriendshipStatusId>;

  createAddresseeId_FriendshipStatus!: Sequelize.BelongsToManyCreateAssociationMixin<FriendshipStatus>;

  removeAddresseeId_FriendshipStatus!: Sequelize.BelongsToManyRemoveAssociationMixin<FriendshipStatus, FriendshipStatusId>;

  removeAddresseeId_FriendshipStatuses!: Sequelize.BelongsToManyRemoveAssociationsMixin<FriendshipStatus, FriendshipStatusId>;

  hasAddresseeId_FriendshipStatus!: Sequelize.BelongsToManyHasAssociationMixin<FriendshipStatus, FriendshipStatusId>;

  hasAddresseeId_FriendshipStatuses!: Sequelize.BelongsToManyHasAssociationsMixin<FriendshipStatus, FriendshipStatusId>;

  countAddresseeId_FriendshipStatuses!: Sequelize.BelongsToManyCountAssociationsMixin;

  // FriendshipStatus belongsToMany FriendshipStatus via AddresseeId and RequesterId
  RequesterId_FriendshipStatuses!: FriendshipStatus[];

  getRequesterId_FriendshipStatuses!: Sequelize.BelongsToManyGetAssociationsMixin<FriendshipStatus>;

  setRequesterId_FriendshipStatuses!: Sequelize.BelongsToManySetAssociationsMixin<FriendshipStatus, FriendshipStatusId>;

  addRequesterId_FriendshipStatus!: Sequelize.BelongsToManyAddAssociationMixin<FriendshipStatus, FriendshipStatusId>;

  addRequesterId_FriendshipStatuses!: Sequelize.BelongsToManyAddAssociationsMixin<FriendshipStatus, FriendshipStatusId>;

  createRequesterId_FriendshipStatus!: Sequelize.BelongsToManyCreateAssociationMixin<FriendshipStatus>;

  removeRequesterId_FriendshipStatus!: Sequelize.BelongsToManyRemoveAssociationMixin<FriendshipStatus, FriendshipStatusId>;

  removeRequesterId_FriendshipStatuses!: Sequelize.BelongsToManyRemoveAssociationsMixin<FriendshipStatus, FriendshipStatusId>;

  hasRequesterId_FriendshipStatus!: Sequelize.BelongsToManyHasAssociationMixin<FriendshipStatus, FriendshipStatusId>;

  hasRequesterId_FriendshipStatuses!: Sequelize.BelongsToManyHasAssociationsMixin<FriendshipStatus, FriendshipStatusId>;

  countRequesterId_FriendshipStatuses!: Sequelize.BelongsToManyCountAssociationsMixin;

  // FriendshipStatus hasMany block_table via RequesterId
  block_tables!: block_table[];

  getBlock_tables!: Sequelize.HasManyGetAssociationsMixin<block_table>;

  setBlock_tables!: Sequelize.HasManySetAssociationsMixin<block_table, block_tableId>;

  addBlock_table!: Sequelize.HasManyAddAssociationMixin<block_table, block_tableId>;

  addBlock_tables!: Sequelize.HasManyAddAssociationsMixin<block_table, block_tableId>;

  createBlock_table!: Sequelize.HasManyCreateAssociationMixin<block_table>;

  removeBlock_table!: Sequelize.HasManyRemoveAssociationMixin<block_table, block_tableId>;

  removeBlock_tables!: Sequelize.HasManyRemoveAssociationsMixin<block_table, block_tableId>;

  hasBlock_table!: Sequelize.HasManyHasAssociationMixin<block_table, block_tableId>;

  hasBlock_tables!: Sequelize.HasManyHasAssociationsMixin<block_table, block_tableId>;

  countBlock_tables!: Sequelize.HasManyCountAssociationsMixin;

  // FriendshipStatus hasMany block_table via AddresseeId
  Addressee_block_tables!: block_table[];

  getAddressee_block_tables!: Sequelize.HasManyGetAssociationsMixin<block_table>;

  setAddressee_block_tables!: Sequelize.HasManySetAssociationsMixin<block_table, block_tableId>;

  addAddressee_block_table!: Sequelize.HasManyAddAssociationMixin<block_table, block_tableId>;

  addAddressee_block_tables!: Sequelize.HasManyAddAssociationsMixin<block_table, block_tableId>;

  createAddressee_block_table!: Sequelize.HasManyCreateAssociationMixin<block_table>;

  removeAddressee_block_table!: Sequelize.HasManyRemoveAssociationMixin<block_table, block_tableId>;

  removeAddressee_block_tables!: Sequelize.HasManyRemoveAssociationsMixin<block_table, block_tableId>;

  hasAddressee_block_table!: Sequelize.HasManyHasAssociationMixin<block_table, block_tableId>;

  hasAddressee_block_tables!: Sequelize.HasManyHasAssociationsMixin<block_table, block_tableId>;

  countAddressee_block_tables!: Sequelize.HasManyCountAssociationsMixin;

  // FriendshipStatus belongsTo users via RequesterId
  Requester!: users;

  getRequester!: Sequelize.BelongsToGetAssociationMixin<users>;

  setRequester!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createRequester!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // FriendshipStatus belongsTo users via AddresseeId
  Addressee!: users;

  getAddressee!: Sequelize.BelongsToGetAssociationMixin<users>;

  setAddressee!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createAddressee!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // FriendshipStatus belongsTo users via SpecifierId
  Specifier!: users;

  getSpecifier!: Sequelize.BelongsToGetAssociationMixin<users>;

  setSpecifier!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createSpecifier!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof FriendshipStatus {
    return FriendshipStatus.init({
    id: {
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
    SpecifiedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'FriendshipStatus',
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
        name: 'FriendshipStatusToRequesterId_FK',
        using: 'BTREE',
        fields: [
          { name: 'RequesterId' },
        ]
      },
      {
        name: 'FriendshipStatusToAddresseeId_FK',
        using: 'BTREE',
        fields: [
          { name: 'AddresseeId' },
        ]
      },
      {
        name: 'FriendshipStatusToSpecifier_FK',
        using: 'BTREE',
        fields: [
          { name: 'SpecifierId' },
        ]
      },
    ]
  });
  }
}
