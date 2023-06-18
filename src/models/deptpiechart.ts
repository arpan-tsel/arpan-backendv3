import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class deptpiechart extends Model {
    public id!: number;
    public division_id?: number | null;
    public department_id!: number;
    public counter?: number | null;
}

deptpiechart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        division_id: {
            type: DataTypes.INTEGER,
            defaultValue: null,
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

export default deptpiechart;