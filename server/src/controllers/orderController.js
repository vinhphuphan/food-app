import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/config.js";
import { nanoid } from "nanoid";


const model = initModels(sequelize);
// Create new order API
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

// Update the order
const updateOrder = async (req, res) => {
    let { order_code } = req.params;
    let newOrder = {
        user_id : req.body.user_id,
        food_id : req.body.food_id,
        amount :  req.body.amount
    }
    try {
        // Find the old order
        const oldOrder = await model.orders.findOne({
            where: {
                code: order_code
            }
        });
        // Return not found message
        if (!oldOrder) {
            return responseData(res, `Order with code ${order_code} not found`, 404);
        }
        // Check if the new order is the same as the old order
        const isSameOrder = (
            newOrder.user_id === oldOrder.user_id &&
            newOrder.food_id === oldOrder.food_id &&
            newOrder.amount === oldOrder.amount
        );

        if (isSameOrder) {
            // If the new order is the same as the old order, return the old order
            return responseData(res, "Order remains unchanged", 200, oldOrder);
        }
        // Update order
        const updatedOrder = await model.orders.update(
            newOrder,
            { 
                where: { code : order_code },
            }
        );
        // Return the updated order
        return responseData(res, "Order updated successfully", 200, newOrder);

    } catch (error) {
        console.error(`Error when update order by order_code : ${error}`);
        return responseData(res,`Failed to update order by order_code`,500);
    }
}

// Delete the order
const deleteOrder = async (req, res) => {
    let { order_code } = req.params;
    
    try {
        // Find the order
        const orderToDelete = await model.orders.findOne({
            where: {
                code: order_code
            }
        });

        // Check if the order exists
        if (!orderToDelete) {
            return responseData(res, `Order with code ${order_code} not found`, 404);
        }
        
        // Delete order
        await model.orders.destroy({ where: { code : order_code }});

        // Return the updated order
        return responseData(res, "Delete order successfully", 200, orderToDelete);

    } catch (error) {
        console.error(`Error when delete order by order_code : ${error}`);
        return responseData(res,`Failed to delete order by order_code`,500);
    }
}


export { createNewOrder, getOrderByUser, getOrderByFood , updateOrder, deleteOrder};
