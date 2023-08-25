import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface contactsAttributes {
    id: number;
    userId: number;
    friendId: number;
    typeRelationship?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type contactsPk = 'id';
export type contactsId = contacts[contactsPk];
export type contactsOptionalAttributes =
    | 'id'
    | 'typeRelationship'
    | 'createdAt'
    | 'updatedAt';
export type contactsCreationAttributes = Optional<
    contactsAttributes,
    contactsOptionalAttributes
>;

export class contacts
    extends Model<contactsAttributes, contactsCreationAttributes>
    implements contactsAttributes
{
    id!: number;

    userId!: number;

    friendId!: number;

    typeRelationship?: string;

    createdAt?: string;

    updatedAt?: string;

    // contacts belongsTo users via userId
    user!: users;

    getUser!: Sequelize.BelongsToGetAssociationMixin<users>;

    setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

    createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

    // contacts belongsTo users via friendId
    friend!: users;

    getFriend!: Sequelize.BelongsToGetAssociationMixin<users>;

    setFriend!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

    createFriend!: Sequelize.BelongsToCreateAssociationMixin<users>;

    static initModel(sequelize: Sequelize.Sequelize): typeof contacts {
        return contacts.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                friendId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                typeRelationship: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                createdAt: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                updatedAt: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'contacts',
                timestamps: false,
                indexes: [
                    {
                        name: 'PRIMARY',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'id' }],
                    },
                    {
                        name: 'id_UNIQUE',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'id' }],
                    },
                    {
                        name: 'fk_contacts_1_idx',
                        using: 'BTREE',
                        fields: [{ name: 'userId' }, { name: 'friendId' }],
                    },
                    {
                        name: 'fk_contacts_2_idx',
                        using: 'BTREE',
                        fields: [{ name: 'friendId' }],
                    },
                ],
            }
        );
    }
}
