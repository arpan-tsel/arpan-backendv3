import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class masterdivision extends Model {
    public id!: number;
    public division!: string;
    public sub_directorate!: string;
}

masterdivision.init(
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
        sub_directorate: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'masterdivision',
        tableName: 'masterdivisions',
        timestamps: true,

    }
);

export default masterdivision;