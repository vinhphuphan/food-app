import express from "express";
import { createNewOrder, getOrderByUser } from "../controllers/orderController.js";

const orderRouter = express();

orderRouter.post("/create", createNewOrder);
orderRouter.get("/get-orders-by-user/:user_id", getOrderByUser);

export default orderRouter;