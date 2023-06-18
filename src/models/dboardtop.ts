import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class dboardtop extends Model {
    public id!: number;
    public rfs!: number;
    public rfi!: number;
    public rfc!: number;
    public itr!: number;
}

dboardtop.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        rfs: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        rfi: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        rfc: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        itr: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'dboardtop',
        tableName: 'dboardtops', // Specify the table name if it's different from the model name
        timestamps: true,
    }
);

export default dboardtop;