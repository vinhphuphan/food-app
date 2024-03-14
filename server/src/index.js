import express from "express";
import sequelize from "./models/connect.js";
import rootRouter from "./routes/rootRouter.js";
import cors from "cors";

const app = express();
const port = 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(rootRouter);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
