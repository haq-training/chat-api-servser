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

  createdAt!: Date;

  updatedAt!: Date;

  // users hasMany Friendship via RequesterId
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

  // users hasMany Friendship via AddresseeId
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

  // users belongsToMany users via RequesterId and AddresseeId
  AddresseeId_users!: users[];

  getAddresseeId_users!: Sequelize.BelongsToManyGetAssociationsMixin<users>;

  setAddresseeId_users!: Sequelize.BelongsToManySetAssociationsMixin<users, usersId>;

  addAddresseeId_user!: Sequelize.BelongsToManyAddAssociationMixin<users, usersId>;

  addAddresseeId_users!: Sequelize.BelongsToManyAddAssociationsMixin<users, usersId>;

  createAddresseeId_user!: Sequelize.BelongsToManyCreateAssociationMixin<users>;

  removeAddresseeId_user!: Sequelize.BelongsToManyRemoveAssociationMixin<users, usersId>;

  removeAddresseeId_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<users, usersId>;

  hasAddresseeId_user!: Sequelize.BelongsToManyHasAssociationMixin<users, usersId>;

  hasAddresseeId_users!: Sequelize.BelongsToManyHasAssociationsMixin<users, usersId>;

  countAddresseeId_users!: Sequelize.BelongsToManyCountAssociationsMixin;

  // users belongsToMany users via AddresseeId and RequesterId
  RequesterId_users!: users[];

  getRequesterId_users!: Sequelize.BelongsToManyGetAssociationsMixin<users>;

  setRequesterId_users!: Sequelize.BelongsToManySetAssociationsMixin<users, usersId>;

  addRequesterId_user!: Sequelize.BelongsToManyAddAssociationMixin<users, usersId>;

  addRequesterId_users!: Sequelize.BelongsToManyAddAssociationsMixin<users, usersId>;

  createRequesterId_user!: Sequelize.BelongsToManyCreateAssociationMixin<users>;

  removeRequesterId_user!: Sequelize.BelongsToManyRemoveAssociationMixin<users, usersId>;

  removeRequesterId_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<users, usersId>;

  hasRequesterId_user!: Sequelize.BelongsToManyHasAssociationMixin<users, usersId>;

  hasRequesterId_users!: Sequelize.BelongsToManyHasAssociationsMixin<users, usersId>;

  countRequesterId_users!: Sequelize.BelongsToManyCountAssociationsMixin;

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
