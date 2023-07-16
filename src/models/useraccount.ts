import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Department from './masterdepartment';

class useraccount extends Model {
    [x: string]: any;
    public id!: number;
    public uuid!: string;
    public name?: string | null;
    public username!: string;
    public password!: string;
    public role?: 'admin' | 'regular' | 'quality' | null;
    public employee_title?: string | null;
    // division
    public department_id?: number | null;
    public address?: string | null;
    public phone?: string | null;
    public refreshToken?: string | null;

    public readonly department!: Department;
}

useraccount.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        uuid: {
            type: DataTypes.STRING(255),
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            defaultValue: null,
            validate: {
                len: {
                    args: [5, 60],
                    msg: 'Nama minimal 5 karakter dan maksimal 60 karakter'
                }

            },
        },
        username: {
            type: DataTypes.STRING(30),
            defaultValue: null,
            validate: {
                len: {
                    args: [8, 24],
                    msg: 'Username minimal 8 karakter dan maksimal 24 karakter'
                },
                is: {
                    args: /^[a-z0-9]+$/i,
                    msg: 'username hanya alphanumerik'
                }

            }
        },
        password: {
            type: DataTypes.STRING(255),
            defaultValue: null,
        },
        role: {
            type: DataTypes.ENUM('admin', 'regular', 'quality'),
            defaultValue: null,
        },
        employee_title: {
            type: DataTypes.STRING(100),
            defaultValue: null,
        },
        department_id: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        address: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        phone: {
            type: DataTypes.STRING(20),
            defaultValue: null,
        },
        refreshToken: {
            type: DataTypes.STRING(300),
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'useraccount',
        tableName: 'useraccounts',
        timestamps: true,
    }
);

// Define the association between masterdepartment and division
useraccount.belongsTo(Department, {
    foreignKey: 'department_id',
});

export default useraccount;