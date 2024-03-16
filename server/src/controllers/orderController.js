import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/config.js";
import { nanoid } from "nanoid";


const model = initModels(sequelize);
// Create new order
const createNewOrder = async (req, res) => {
  const { user_id, food_id, amount } = req.body;

  try {
    // Kiểm tra xem user_id và food_id có tồn tại hay không
    const userExists = await model.users.findOne({ where: { id: user_id } });
    const foodExists = await model.foods.findOne({ where: { id: food_id } });

    if (!foodExists) {
      return responseData(res, "Food does not exist", 400, null);
    }

    if (!userExists) {
      return responseData(res, "User does not exist", 400, null);
    }

    const new_order = await model.orders.create({
      user_id: user_id,
      food_id: food_id,
      amount: amount,
    });
    return responseData(res, "Order created successfully", 200, new_order);
  } catch (error) {
    console.error(`Error when creating new order: ${error}`);
    return responseData(res, `Failed to creating new order`, 500, null);
  }
};

// Get all orders
const getOrder = async (req, res) => {
  try {
    const data = await model.orders.findAll();
    return responseData(res,`Get all orders successfully`,200,data
    );
  } catch (error) {
    console.error(`Error when getting all orders : ${error}`);
    return responseData(
      res,
      `Failed to get all orders`,
      500,
      null
    );
  }
};

// Get order by user_id
const getOrderByUser = async (req, res) => {
  let { user_id } = req.params;

  try {
    const data = await model.orders.findAll({
      where: {
        user_id: user_id,
      },
    });
    return responseData(
      res,
      `Get orders for user id ${user_id} successfully`,
      200,
      data
    );
  } catch (error) {
    console.error(`Error when getting orders for user id ${user_id}: ${error}`);
    return responseData(
      res,
      `Failed to Get orders for user id ${user_id}`,
      500,
      null
    );
  }
};

// Get order by food_id
const getOrderByFood = async (req, res) => {
  let { food_id } = req.params;

  try {
    const data = await model.orders.findAll({
      where: {
        food_id: food_id,
      },
    });
    return responseData(
      res,
      `Get orders by food id ${food_id} successfully`,
      200,
      data
    );
  } catch (error) {
    console.error(`Error when getting orders by food id ${food_id}: ${error}`);
    return responseData(res,`Failed to Get orders by food id ${food_id}`,500);
  }
};




export { createNewOrder,getOrder, getOrderByUser, getOrderByFood};
