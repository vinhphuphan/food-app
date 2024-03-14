import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/config.js";
import { nanoid } from "nanoid";

const model = initModels(sequelize);

const createNewOrder = async (req, res) => {
  let { user_id, food_id, amount } = req.body;

  try {
    const order_code = nanoid(10);
    const new_order = await model.orders.create({
      user_id: user_id,
      food_id: food_id,
      amount: amount,
      code: order_code,
    });
    return responseData(res, "Order created successfully", 200, new_order);
  } catch (error) {
    console.error(`Error when creating new order: ${error}`);
    return responseData(res, `Failed to creating new order`, 500, null);
  }
};

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
    return responseData(res,`Failed to Get orders for user id ${user_id}`,500, null);
  }
};

export { createNewOrder, getOrderByUser };
