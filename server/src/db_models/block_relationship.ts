import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface block_relationshipAttributes {
  idBlock_relationship: number;
  idUser: number;
  idBlock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type block_relationshipPk = 'idBlock_relationship';
export type block_relationshipId = block_relationship[block_relationshipPk];
export type block_relationshipOptionalAttributes = 'createdAt' | 'updatedAt';
export type block_relationshipCreationAttributes = Optional<block_relationshipAttributes, block_relationshipOptionalAttributes>;

export class block_relationship
    extends Model<block_relationshipAttributes, block_relationshipCreationAttributes>
    implements block_relationshipAttributes
{
  idBlock_relationship!: number;

  idUser!: number;

  idBlock!: number;

  createdAt?: Date;

  updatedAt?: Date;

  // block_relationship belongsTo users via idUser
  idUser_user!: users;

  getIdUser_user!: Sequelize.BelongsToGetAssociationMixin<users>;

  setIdUser_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createIdUser_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  // block_relationship belongsTo users via idBlock
  idBlock_user!: users;

  getIdBlock_user!: Sequelize.BelongsToGetAssociationMixin<users>;

  setIdBlock_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createIdBlock_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof block_relationship {
    return block_relationship.init({
    idBlock_relationship: {
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
    idBlock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'block_relationship',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'idBlock_relationship' },
        ]
      },
      {
        name: 'fk_block_relationship_1_idx',
        using: 'BTREE',
        fields: [
          { name: 'idUser' },
        ]
      },
      {
        name: 'fk_block_relationship_2_idx',
        using: 'BTREE',
        fields: [
          { name: 'idBlock' },
        ]
      },
    ]
  });
  }
}
