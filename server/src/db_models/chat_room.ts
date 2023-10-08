import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chat_members, chat_membersId } from './chat_members';

export interface chat_roomAttributes {
  id: number;
  type: number;
  roomName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isOpen: number;
}

export type chat_roomPk = 'id';
export type chat_roomId = chat_room[chat_roomPk];
export type chat_roomOptionalAttributes = 'id' | 'roomName' | 'createdAt' | 'updatedAt';
export type chat_roomCreationAttributes = Optional<chat_roomAttributes, chat_roomOptionalAttributes>;

export class chat_room extends Model<chat_roomAttributes, chat_roomCreationAttributes> implements chat_roomAttributes {
  id!: number;

  type!: number;

  roomName?: string;

  createdAt?: Date;

  updatedAt?: Date;

  isOpen!: number;

  // chat_room hasMany chat_members via chatRoomId
  chat_members!: chat_members[];

  getChat_members!: Sequelize.HasManyGetAssociationsMixin<chat_members>;

  setChat_members!: Sequelize.HasManySetAssociationsMixin<chat_members, chat_membersId>;

  addChat_member!: Sequelize.HasManyAddAssociationMixin<chat_members, chat_membersId>;

  addChat_members!: Sequelize.HasManyAddAssociationsMixin<chat_members, chat_membersId>;

  createChat_member!: Sequelize.HasManyCreateAssociationMixin<chat_members>;

  removeChat_member!: Sequelize.HasManyRemoveAssociationMixin<chat_members, chat_membersId>;

  removeChat_members!: Sequelize.HasManyRemoveAssociationsMixin<chat_members, chat_membersId>;

  hasChat_member!: Sequelize.HasManyHasAssociationMixin<chat_members, chat_membersId>;

  hasChat_members!: Sequelize.HasManyHasAssociationsMixin<chat_members, chat_membersId>;

  countChat_members!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof chat_room {
    return chat_room.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'chat_room',
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
    ]
  });
  }
}
