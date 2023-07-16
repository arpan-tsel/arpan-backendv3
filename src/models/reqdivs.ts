import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Division from './masterdivision'; // Import the Division model if not already imported

class reqdivs extends Model {
    [x: string]: any;
    public id!: number;
    public division_id!: number;
    public value?: number | null;

    public readonly division!: Division;
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

// Define the association between masterdepartment and division
reqdivs.belongsTo(Division, {
    foreignKey: 'division_id',
});

export default reqdivs;