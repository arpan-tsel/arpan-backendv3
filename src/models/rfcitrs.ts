import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class rfcitrs extends Model {
    public id!: number;
    public year?: string | null;
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
}

rfcitrs.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        year: {
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
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'rfcitrs',
        tableName: 'rfcitrs',
        timestamps: true,
    }
);

export default rfcitrs;