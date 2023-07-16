import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class deptpiechart extends Model {
    public id!: number;
    // division
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