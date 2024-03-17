import express from "express";
import { createNewOrder, getOrders, getOrderByUser, getOrderByFood } from "../controllers/orderController.js";

const orderRouter = express();

orderRouter.post("", createNewOrder);
orderRouter.get("", getOrders)
orderRouter.get("/by-user/:user_id", getOrderByUser);
orderRouter.get("/by-food/:food_id", getOrderByFood);


export default orderRouter;