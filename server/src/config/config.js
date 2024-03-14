import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
}

const responseData = (res, message, code, data) => {
  res.json({
      message,
      code,
      data,
      date : new Date()
  })
}

export { dbConfig,  responseData};
