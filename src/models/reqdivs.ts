import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class reqdivs extends Model {
    public id!: number;
    public division_id!: number;
    public value?: number | null;
}

reqdivs.init(
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
        value: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'reqdivs',
        tableName: 'reqdivs',
        timestamps: true,
    }
);

export default reqdivs;