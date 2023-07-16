import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Department from './masterdepartment'; // Import the Division model if not already imported


class deptpiechart extends Model {
    [x: string]: any;
    public id!: number;
    // division
    public department_id!: number;
    public counter?: number | null;

    public readonly department!: Department;
}

deptpiechart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        counter: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'deptpiechart',
        tableName: 'deptpiecharts',
        timestamps: true,
    }
);

// Define the association between masterdepartment and division
deptpiechart.belongsTo(Department, {
    foreignKey: 'department_id',
});

export default deptpiechart;