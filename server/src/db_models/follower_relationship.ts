import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface follower_relationshipAttributes {
  idFollower_relationship: number;
  idUser: number;
  idFollower: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type follower_relationshipPk = 'idFollower_relationship';
export type follower_relationshipId = follower_relationship[follower_relationshipPk];
export type follower_relationshipOptionalAttributes = 'createdAt' | 'updatedAt';
export type follower_relationshipCreationAttributes = Optional<follower_relationshipAttributes, follower_relationshipOptionalAttributes>;

export class follower_relationship
    extends Model<follower_relationshipAttributes, follower_relationshipCreationAttributes>
    implements follower_relationshipAttributes
{
  idFollower_relationship!: number;

  idUser!: number;

  idFollower!: number;

  createdAt?: Date;

  updatedAt?: Date;

  // follower_relationship belongsTo users via idUser
  idUser_user!: users;

  getIdUser_user!: Sequelize.BelongsToGetAssociationMixin<users>;

  setIdUser_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createIdUser_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // follower_relationship belongsTo users via idFollower
  idFollower_user!: users;

  getIdFollower_user!: Sequelize.BelongsToGetAssociationMixin<users>;

  setIdFollower_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createIdFollower_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof follower_relationship {
    return follower_relationship.init({
    idFollower_relationship: {
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
    idFollower: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'follower_relationship',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'idFollower_relationship' },
        ]
      },
      {
        name: 'fk_follower_relationship_1_idx',
        using: 'BTREE',
        fields: [
          { name: 'idUser' },
        ]
      },
      {
        name: 'fk_follower_relationship_2_idx',
        using: 'BTREE',
        fields: [
          { name: 'idFollower' },
        ]
      },
    ]
  });
  }
}
