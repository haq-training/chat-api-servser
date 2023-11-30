import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import { FilterQuery } from 'mongoose';
import type {
  chat_members,
  chat_membersAttributes,
  chat_membersId,
} from './chat_members';
import { TRDBConnection, TRDBEdge } from '../lib/ultis/relay';
import ChatMessage, { IChatMessageModel } from '../mongodb_models/chatMessage';

export interface chat_roomAttributes {
  id: number;
  type: number;
  roomName?: string;
  chat_members?: Partial<chat_membersAttributes>[];
  createdAt?: Date;
  updatedAt?: Date;
  isOpen: number;
}

export type chat_roomPk = 'id';
export type chat_roomId = chat_room[chat_roomPk];
export type chat_roomCreationAttributes = Optional<
    chat_roomAttributes,
    chat_roomPk
>;

export type ChatRoomEdge = TRDBEdge<chat_room>;
export type ChatRoomConnection = TRDBConnection<chat_room>;

export class chat_room
    extends Model<chat_roomAttributes, chat_roomCreationAttributes>
    implements chat_roomAttributes {
  id!: number;

  type!: number;

  roomName?: string;

  createdAt?: Date;

  updatedAt?: Date;

  isOpen!: number;

  unread_count?: number;

  async setUnreadCount(objectId: string | undefined) {
    const filter: FilterQuery<IChatMessageModel> = {
      room_id: this.id,
    };
    this.unread_count = objectId
        ? await ChatMessage.countDocuments(filter)
            .where('_id')
            .gt(objectId as any)
            .exec()
        : await ChatMessage.countDocuments(filter);
  }

  // chat_room hasMany chat_member via chat_room_id
  chat_members!: chat_members[];

  getChat_members!: Sequelize.HasManyGetAssociationsMixin<chat_members>;

  setChat_members!: Sequelize.HasManySetAssociationsMixin<
      chat_members,
      chat_membersId
  >;

  addChat_member!: Sequelize.HasManyAddAssociationMixin<
      chat_members,
      chat_membersId
  >;

  addChat_members!: Sequelize.HasManyAddAssociationsMixin<
      chat_members,
      chat_membersId
  >;

  createChat_member!: Sequelize.HasManyCreateAssociationMixin<chat_members>;

  removeChat_member!: Sequelize.HasManyRemoveAssociationMixin<
      chat_members,
      chat_membersId
  >;

  removeChat_members!: Sequelize.HasManyRemoveAssociationsMixin<
      chat_members,
      chat_membersId
  >;

  hasChat_member!: Sequelize.HasManyHasAssociationMixin<
      chat_members,
      chat_membersId
  >;

  hasChat_members!: Sequelize.HasManyHasAssociationsMixin<
      chat_members,
      chat_membersId
  >;

  countChat_members!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof chat_room {
    chat_room.init(
        {
          id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: '1:private 2:group',
          },
          roomName: {
            type: DataTypes.STRING(45),
            allowNull: true,
          },
          isOpen: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
            comment: '1:true 0:false',
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        {
          sequelize,
          tableName: 'chat_room',
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          indexes: [
            {
              name: 'PRIMARY',
              unique: true,
              using: 'BTREE',
              fields: [{ name: 'id' }],
            },
          ],
        }
    );
    return chat_room;
  }
}
