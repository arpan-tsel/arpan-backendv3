import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class reqdivs extends Model {
    public id!: number;
    public division!: string;
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
        division: {
            type: DataTypes.STRING(255),
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