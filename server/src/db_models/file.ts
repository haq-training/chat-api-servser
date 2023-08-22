import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface fileAttributes {
    id: number;
    uploadBy?: number;
    mimeType?: string;
    keyPath: string;
    bucket: string;
    encoding?: string;
    createAt?: Date;
    updateAt?: Date;
}

export type filePk = 'id';
export type fileId = file[filePk];
export type fileOptionalAttributes =
    | 'uploadBy'
    | 'mimeType'
    | 'encoding'
    | 'createAt'
    | 'updateAt';
export type fileCreationAttributes = Optional<
    fileAttributes,
    fileOptionalAttributes
>;

export class file
    extends Model<fileAttributes, fileCreationAttributes>
    implements fileAttributes
{
    id!: number;

    uploadBy?: number;

    mimeType?: string;

    keyPath!: string;

    bucket!: string;

    encoding?: string;

    createAt?: Date;

    updateAt?: Date;

    // file belongsTo users via uploadBy
    uploadBy_user!: users;

    getUploadBy_user!: Sequelize.BelongsToGetAssociationMixin<users>;

    setUploadBy_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;

    createUploadBy_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

    static initModel(sequelize: Sequelize.Sequelize): typeof file {
        return file.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                uploadBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                mimeType: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                keyPath: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                },
                bucket: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                },
                encoding: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                createAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                updateAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'file',
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
                        name: 'fk_file_1_idx',
                        using: 'BTREE',
                        fields: [{ name: 'uploadBy' }],
                    },
                ],
            }
        );
    }
}
