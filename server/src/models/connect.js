import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config.js";

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.pass, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
});

export default sequelize;