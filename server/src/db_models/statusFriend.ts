import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { FriendShipStatus, FriendShipStatusId } from './FriendShipStatus';

export interface statusFriendAttributes {
  status: string;
  name: string;
}

export type statusFriendPk = 'status';
export type statusFriendId = statusFriend[statusFriendPk];
export type statusFriendCreationAttributes = statusFriendAttributes;

export class statusFriend extends Model<statusFriendAttributes, statusFriendCreationAttributes> implements statusFriendAttributes {
  status!: string;

  name!: string;

  // statusFriend hasMany FriendShipStatus via statusFriend
  FriendShipStatuses!: FriendShipStatus[];

  getFriendShipStatuses!: Sequelize.HasManyGetAssociationsMixin<FriendShipStatus>;

  setFriendShipStatuses!: Sequelize.HasManySetAssociationsMixin<FriendShipStatus, FriendShipStatusId>;

  addFriendShipStatus!: Sequelize.HasManyAddAssociationMixin<FriendShipStatus, FriendShipStatusId>;

  addFriendShipStatuses!: Sequelize.HasManyAddAssociationsMixin<FriendShipStatus, FriendShipStatusId>;

  createFriendShipStatus!: Sequelize.HasManyCreateAssociationMixin<FriendShipStatus>;

  removeFriendShipStatus!: Sequelize.HasManyRemoveAssociationMixin<FriendShipStatus, FriendShipStatusId>;

  removeFriendShipStatuses!: Sequelize.HasManyRemoveAssociationsMixin<FriendShipStatus, FriendShipStatusId>;

  hasFriendShipStatus!: Sequelize.HasManyHasAssociationMixin<FriendShipStatus, FriendShipStatusId>;

  hasFriendShipStatuses!: Sequelize.HasManyHasAssociationsMixin<FriendShipStatus, FriendShipStatusId>;

  countFriendShipStatuses!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof statusFriend {
    return statusFriend.init({
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'statusFriend',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'status' },
        ]
      },
    ]
  });
  }
}
