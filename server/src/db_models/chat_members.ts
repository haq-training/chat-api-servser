import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chat_room, chat_roomId } from './chat_room';
import type { users, usersId } from './users';

export interface chat_membersAttributes {
  id: number;
  chatRoomId: number;
  userId: number;
  isAdmin: number;
  status: number;
  lastViewMsg?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type chat_membersPk = 'id';
export type chat_membersId = chat_members[chat_membersPk];
export type chat_membersOptionalAttributes = 'id' | 'lastViewMsg' | 'createdAt' | 'updatedAt';
export type chat_membersCreationAttributes = Optional<chat_membersAttributes, chat_membersOptionalAttributes>;

export class chat_members extends Model<chat_membersAttributes, chat_membersCreationAttributes> implements chat_membersAttributes {
  id!: number;

  chatRoomId!: number;

  userId!: number;

  isAdmin!: number;

  status!: number;

  lastViewMsg?: Date;

  createdAt!: Date;

  updatedAt!: Date;

  // chat_members belongsTo chat_room via chatRoomId
  chatRoom!: chat_room;

  getChatRoom!: Sequelize.BelongsToGetAssociationMixin<chat_room>;

  setChatRoom!: Sequelize.BelongsToSetAssociationMixin<chat_room, chat_roomId>;

  createChatRoom!: Sequelize.BelongsToCreateAssociationMixin<chat_room>;

  // chat_members belongsTo users via userId
  user!: users;

  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;

  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chat_members {
    return chat_members.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chat_room',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    lastViewMsg: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chat_members',
    timestamps: true,
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
        name: 'id_UNIQUE',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
        ]
      },
      {
        name: 'fk_chat_members_1_idx',
        using: 'BTREE',
        fields: [
          { name: 'chatRoomId' },
        ]
      },
      {
        name: 'fk_chat_members_2_idx',
        using: 'BTREE',
        fields: [
          { name: 'userId' },
        ]
      },
    ]
  });
  }
}
