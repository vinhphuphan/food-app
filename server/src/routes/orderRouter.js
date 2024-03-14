import express from "express";
import { createNewOrder, getOrderByUser, getOrderByFood, updateOrder, deleteOrder } from "../controllers/orderController.js";

const orderRouter = express();

orderRouter.post("/create", createNewOrder);
orderRouter.get("/get-orders-by-user/:user_id", getOrderByUser);
orderRouter.get("/get-orders-by-food/:food_id", getOrderByFood);
orderRouter.put("/:order_code", updateOrder);
orderRouter.delete("/:order_code", deleteOrder);


export default orderRouter;