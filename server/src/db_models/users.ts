import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chat_members, chat_membersId } from './chat_members';
import type { contacts, contactsId } from './contacts';
import type { file, fileId } from './file';

export interface usersAttributes {
    id: number;
    email: string;
    password: string;
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
    status?: boolean;
    location?: string;
    story?: string;
    role: number;
    changePassword : number;
    createdAt?: Date;
    updatedAt?: Date;
}

export type usersPk = 'id';
export type usersId = users[usersPk];
export type usersOptionalAttributes =
    | 'id'
    | 'avatarUrl'
    | 'firstName'
    | 'lastName'
    | 'location'
    | 'story'
    | 'changePassword'
    | 'createdAt'
    | 'updatedAt';
export type usersCreationAttributes = Optional<
    usersAttributes,
    usersOptionalAttributes
>;

export class users
    extends Model<usersAttributes, usersCreationAttributes>
    implements usersAttributes
{
    id!: number;

    email!: string;

    password!: string;

    avatarUrl?: string;

    firstName?: string;

    lastName?: string;

    status?: boolean;

    location?: string;

    story?: string;

    role!: number;

    changePassword!: number;

    createdAt?: Date;

    updatedAt?: Date;

    // users hasMany chat_members via userId
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

    // users hasMany contacts via userId
    contacts!: contacts[];

    getContacts!: Sequelize.HasManyGetAssociationsMixin<contacts>;

    setContacts!: Sequelize.HasManySetAssociationsMixin<contacts, contactsId>;

    addContact!: Sequelize.HasManyAddAssociationMixin<contacts, contactsId>;

    addContacts!: Sequelize.HasManyAddAssociationsMixin<contacts, contactsId>;

    createContact!: Sequelize.HasManyCreateAssociationMixin<contacts>;

    removeContact!: Sequelize.HasManyRemoveAssociationMixin<
        contacts,
        contactsId
    >;

    removeContacts!: Sequelize.HasManyRemoveAssociationsMixin<
        contacts,
        contactsId
    >;

    hasContact!: Sequelize.HasManyHasAssociationMixin<contacts, contactsId>;

    hasContacts!: Sequelize.HasManyHasAssociationsMixin<contacts, contactsId>;

    countContacts!: Sequelize.HasManyCountAssociationsMixin;

    // users hasMany contacts via friendId
    friend_contacts!: contacts[];

    getFriend_contacts!: Sequelize.HasManyGetAssociationsMixin<contacts>;

    setFriend_contacts!: Sequelize.HasManySetAssociationsMixin<
        contacts,
        contactsId
    >;

    addFriend_contact!: Sequelize.HasManyAddAssociationMixin<
        contacts,
        contactsId
    >;

    addFriend_contacts!: Sequelize.HasManyAddAssociationsMixin<
        contacts,
        contactsId
    >;

    createFriend_contact!: Sequelize.HasManyCreateAssociationMixin<contacts>;

    removeFriend_contact!: Sequelize.HasManyRemoveAssociationMixin<
        contacts,
        contactsId
    >;

    removeFriend_contacts!: Sequelize.HasManyRemoveAssociationsMixin<
        contacts,
        contactsId
    >;

    hasFriend_contact!: Sequelize.HasManyHasAssociationMixin<
        contacts,
        contactsId
    >;

    hasFriend_contacts!: Sequelize.HasManyHasAssociationsMixin<
        contacts,
        contactsId
    >;

    countFriend_contacts!: Sequelize.HasManyCountAssociationsMixin;

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
        return users.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                email: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                    unique: 'email_UNIQUE',
                },
                password: {
                    type: DataTypes.STRING(200),
                    allowNull: false,
                },
                changePassword : {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                avatarUrl: {
                    type: DataTypes.STRING(200),
                    allowNull: true,
                },
                firstName: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                lastName: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                status: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                location: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                story: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                role: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'users',
                timestamps: true,
                indexes: [
                    {
                        name: 'PRIMARY',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'id' }],
                    },
                    {
                        name: 'email_UNIQUE',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'email' }],
                    },
                    {
                        name: 'id_UNIQUE',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'id' }],
                    },
                ],
            }
        );
    }
}
