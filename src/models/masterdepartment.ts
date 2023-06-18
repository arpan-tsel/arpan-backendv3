import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class masterdepartment extends Model {
    public id!: number;
    public department!: string;
    public division_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

masterdepartment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        division_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'masterdepartment',
        tableName: 'masterdepartments',
        timestamps: true,
    }
);

export default masterdepartment;
