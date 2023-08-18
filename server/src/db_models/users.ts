import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface usersAttributes {
    id: number;
    email: string;
    password: string;
    avatar_url?: string;
    first_name?: string;
    last_name?: string;
    status: string;
    location?: string;
    story?: string;
    file?: string;
    role: string;
    created_at?: string;
    updated_at?: string;
}

export type usersPk = 'id';
export type usersId = users[usersPk];
export type usersOptionalAttributes =
    | 'avatar_url'
    | 'first_name'
    | 'last_name'
    | 'location'
    | 'story'
    | 'file'
    | 'created_at'
    | 'updated_at';
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

    avatar_url?: string;

    first_name?: string;

    last_name?: string;

    status!: string;

    location?: string;

    story?: string;

    file?: string;

    role!: string;

    created_at?: string;

    updated_at?: string;

    static initModel(sequelize: Sequelize.Sequelize): typeof users {
        return users.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                email: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                    unique: 'email_UNIQUE',
                },
                password: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                },
                avatar_url: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                first_name: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                last_name: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                status: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                },
                location: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                story: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                file: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                role: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
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
                        name: 'id_UNIQUE',
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
                ],
            }
        );
    }
}
