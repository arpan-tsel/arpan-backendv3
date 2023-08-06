import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Division from './masterdivision'; // Import the Division model if not already imported


class masterdepartment extends Model {
    [x: string]: any;
    public id!: number;
    public division_id!: number;
    public department!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly division?: Division;
}

masterdepartment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        division_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING(255),
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

// Define the association between masterdepartment and division
masterdepartment.belongsTo(Division, {
    foreignKey: 'division_id',
});

export default masterdepartment;
