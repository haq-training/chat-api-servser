import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface userAttributes {
    id: number;
    userName: string;
    password: string;
}

export class user extends Model<userAttributes> implements userAttributes {
    id!: number;

    userName!: string;

    password!: string;

    static initModel(sequelize: Sequelize.Sequelize): typeof user {
        return user.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                userName: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: 'userName_UNIQUE',
                },

                password: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'user',
                timestamps: true,
                indexes: [
                    {
                        name: 'PRIMARY',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'id' }],
                    },
                    {
                        name: 'userName_UNIQUE',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'userName' }],
                    },
                ],
            }
        );
        return user;
    }
}