import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class deptpiechart extends Model {
    public id!: number;
    public division?: string | null;
    public department!: string;
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
        division: {
            type: DataTypes.STRING(255),
            defaultValue: null,
        },
        department: {
            type: DataTypes.STRING(255),
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