import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Friendship, FriendshipId } from './Friendship';
import type { HistoryFriendShip, HistoryFriendShipId } from './HistoryFriendShip';
import type { chat_members, chat_membersId } from './chat_members';
import type { file, fileId } from './file';

export interface usersAttributes {
  id: number;
  email: string;
  password: string;
  changePassword: number;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  status?: number;
  location?: string;
  story?: string;
  role: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type usersPk = 'id';
export type usersId = users[usersPk];
export type usersOptionalAttributes = 'id' | 'avatarUrl' | 'firstName' | 'lastName' | 'status' | 'location' | 'story' | 'createdAt' | 'updatedAt';
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;

  email!: string;

  password!: string;

  changePassword!: number;

  avatarUrl?: string;

  firstName?: string;

  lastName?: string;

  status?: number;

  location?: string;

  story?: string;

  role!: number;

  createdAt?: Date;

  updatedAt?: Date;

  // users hasMany Friendship via AddresseeId
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

  // users hasMany Friendship via RequesterId
  Requester_Friendships!: Friendship[];

  getRequester_Friendships!: Sequelize.HasManyGetAssociationsMixin<Friendship>;

  setRequester_Friendships!: Sequelize.HasManySetAssociationsMixin<Friendship, FriendshipId>;

  addRequester_Friendship!: Sequelize.HasManyAddAssociationMixin<Friendship, FriendshipId>;

  addRequester_Friendships!: Sequelize.HasManyAddAssociationsMixin<Friendship, FriendshipId>;

  createRequester_Friendship!: Sequelize.HasManyCreateAssociationMixin<Friendship>;

  removeRequester_Friendship!: Sequelize.HasManyRemoveAssociationMixin<Friendship, FriendshipId>;

  removeRequester_Friendships!: Sequelize.HasManyRemoveAssociationsMixin<Friendship, FriendshipId>;

  hasRequester_Friendship!: Sequelize.HasManyHasAssociationMixin<Friendship, FriendshipId>;

  hasRequester_Friendships!: Sequelize.HasManyHasAssociationsMixin<Friendship, FriendshipId>;

  countRequester_Friendships!: Sequelize.HasManyCountAssociationsMixin;

  // users hasMany HistoryFriendShip via SpecifierId
  HistoryFriendShips!: HistoryFriendShip[];

  getHistoryFriendShips!: Sequelize.HasManyGetAssociationsMixin<HistoryFriendShip>;

  setHistoryFriendShips!: Sequelize.HasManySetAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  addHistoryFriendShip!: Sequelize.HasManyAddAssociationMixin<HistoryFriendShip, HistoryFriendShipId>;

  addHistoryFriendShips!: Sequelize.HasManyAddAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  createHistoryFriendShip!: Sequelize.HasManyCreateAssociationMixin<HistoryFriendShip>;

  removeHistoryFriendShip!: Sequelize.HasManyRemoveAssociationMixin<HistoryFriendShip, HistoryFriendShipId>;

  removeHistoryFriendShips!: Sequelize.HasManyRemoveAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  hasHistoryFriendShip!: Sequelize.HasManyHasAssociationMixin<HistoryFriendShip, HistoryFriendShipId>;

  hasHistoryFriendShips!: Sequelize.HasManyHasAssociationsMixin<HistoryFriendShip, HistoryFriendShipId>;

  countHistoryFriendShips!: Sequelize.HasManyCountAssociationsMixin;

  // users hasMany chat_members via userId
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

  // users hasMany file via uploadBy
  files!: file[];

  getFiles!: Sequelize.HasManyGetAssociationsMixin<file>;

  setFiles!: Sequelize.HasManySetAssociationsMixin<file, fileId>;

  addFile!: Sequelize.HasManyAddAssociationMixin<file, fileId>;

  addFiles!: Sequelize.HasManyAddAssociationsMixin<file, fileId>;

  createFile!: Sequelize.HasManyCreateAssociationMixin<file>;

  removeFile!: Sequelize.HasManyRemoveAssociationMixin<file, fileId>;

  removeFiles!: Sequelize.HasManyRemoveAssociationsMixin<file, fileId>;

  hasFile!: Sequelize.HasManyHasAssociationMixin<file, fileId>;

  hasFiles!: Sequelize.HasManyHasAssociationsMixin<file, fileId>;

  countFiles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: 'email_UNIQUE'
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    changePassword: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    avatarUrl: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    story: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    role: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: 'email_UNIQUE',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'email' },
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
