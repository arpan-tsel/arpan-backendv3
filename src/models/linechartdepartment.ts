import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Department from './masterdepartment'; // Import the Division model if not already imported


class linechartdepartment extends Model {
    [x: string]: any;
    public id!: number;
    // division
    public department_id?: number | null;
    public january!: number;
    public february!: number;
    public march!: number;
    public april!: number;
    public may!: number;
    public june!: number;
    public july!: number;
    public august!: number;
    public september!: number;
    public october!: number;
    public november!: number;
    public december!: number;

    public readonly department!: Department;
}

linechartdepartment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        department_id: {
            type: DataTypes.STRING(255),
            defaultValue: null,
        },
        january: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        february: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        march: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        april: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        may: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        june: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        july: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        august: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        september: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        october: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        november: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        december: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: 'linechartdepartment',
        tableName: 'linechartdepartments',
        timestamps: true,
    }
);

// Define the association between masterdepartment and division
linechartdepartment.belongsTo(Department, {
    foreignKey: 'department_id',
});

export default linechartdepartment;