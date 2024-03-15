import express from "express";
import { createNewOrder, getOrder, getOrderByUser, getOrderByFood, updateOrder, deleteOrder } from "../controllers/orderController.js";

const orderRouter = express();

orderRouter.post("", createNewOrder);
orderRouter.get("", getOrder)
orderRouter.get("/by-user/:user_id", getOrderByUser);
orderRouter.get("/by-food/:food_id", getOrderByFood);
orderRouter.put("/:code", updateOrder);
orderRouter.delete("/:code", deleteOrder);


export default orderRouter;