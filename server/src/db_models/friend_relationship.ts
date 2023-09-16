import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface friend_relationshipAttributes {
  idFriend_relationship: number;
  idUser: number;
  idFriend: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type friend_relationshipPk = 'idFriend_relationship';
export type friend_relationshipId = friend_relationship[friend_relationshipPk];
export type friend_relationshipOptionalAttributes = 'createdAt' | 'updatedAt';
export type friend_relationshipCreationAttributes = Optional<friend_relationshipAttributes, friend_relationshipOptionalAttributes>;

export class friend_relationship
    extends Model<friend_relationshipAttributes, friend_relationshipCreationAttributes>
    implements friend_relationshipAttributes
{
  idFriend_relationship!: number;

  idUser!: number;

  idFriend!: number;

  createdAt?: Date;

  updatedAt?: Date;

  // friend_relationship belongsTo users via idUser
  idUser_user!: users;

  getIdUser_user!: Sequelize.BelongsToGetAssociationMixin<users>;

  setIdUser_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createIdUser_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // friend_relationship belongsTo users via idFriend
  idFriend_user!: users;

  getIdFriend_user!: Sequelize.BelongsToGetAssociationMixin<users>;

  setIdFriend_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createIdFriend_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof friend_relationship {
    return friend_relationship.init({
    idFriend_relationship: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    idFriend: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'friend_relationship',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'idFriend_relationship' },
        ]
      },
      {
        name: 'fk_friend_relationship_1_idx',
        using: 'BTREE',
        fields: [
          { name: 'idUser' },
        ]
      },
      {
        name: 'fk_friend_relationship_2_idx',
        using: 'BTREE',
        fields: [
          { name: 'idFriend' },
        ]
      },
    ]
  });
  }
}
