import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/config.js";
import { nanoid } from "nanoid";


const model = initModels(sequelize);

// Create new order
const createNewOrder = async (req, res) => {
  try {
    const { user_id, food_id, amount } = req.body;
    // Check if user_id and food_id exist
    const userExists = await model.users.findOne({ where: { user_id } });
    const foodExists = await model.foods.findOne({ where: { food_id } });
    const orderExists =  await model.orders.findOne({ where: { user_id, food_id } });

    if (!userExists) {
      return responseData(res, `User id ${user_id} does not exist`, 400, null);
    }

    if (!foodExists) {
      return responseData(res, `Food id ${food_id} does not exist`, 400, null);
    }

    // Check if order exist
    if (orderExists) {
      return responseData(res, `This order already exists`, 409, null);
    }
    
    const code = nanoid(8);
    const newOrder = await model.orders.create({user_id,food_id,amount,code});
    return responseData(res, "Order created successfully", 201, newOrder);
  } catch (error) {
    console.error(`Error when creating new order: ${error}`);
    return responseData(res, `Failed to creating new order`, 500, null);
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const data = await model.orders.findAll();
    return responseData(res,`Get all orders successfully`,200,data);
  } catch (error) {
    console.error(`Error when getting all orders : ${error}`);
    return responseData(res,`System error`,500,"");
  }
};

// Get order by user_id
const getOrderByUser = async (req, res) => {
  let { user_id } = req.params;

  try {
    // Check if user_id exists in the user table
    const user = await model.users.findOne({ where: { user_id } });

    if (!user) {
      // If user_id doesn't exist, return error response
      return responseData(res, `User with id ${user_id} not found`, 404, "");
    }

    const data = await model.orders.findAll({where: { user_id }});
    return responseData(res, `Get orders for user id ${user_id} successfully`,200,data);
  } catch (error) {
    console.error(`Error when getting orders for user id ${user_id}: ${error}`);
    return responseData(res,`System error`,500,"");
  }
};

// Get order by food_id
const getOrderByFood = async (req, res) => {
  let { food_id } = req.params;

  try {
    // Check if food_id exists in the user table
    const food = await model.orders.findOne({ where: { food_id } });

    if (!food) {
      // If food_id doesn't exist, return error response
      return responseData(res, `Food with id ${food_id} not found`, 404, "");
    }

    const data = await model.orders.findAll({where: { food_id }});
    return responseData(res,`Get orders by food id ${food_id} successfully`,200,data);
  
  } catch (error) {
    console.error(`Error when getting orders by food id ${food_id}: ${error}`);
    return responseData(res,`System error`,500,"");
  }
};

export { createNewOrder, getOrders , getOrderByUser, getOrderByFood};
