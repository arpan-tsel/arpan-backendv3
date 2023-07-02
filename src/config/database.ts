import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DB!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: "127.0.0.1",
    port: Number(process.env.DB_PORT!),
    dialect: 'mysql',
});

export default sequelize;
