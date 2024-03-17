import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/config.js";

const model = initModels(sequelize);

// Rate function
const rateRes = async (req, res) => {
  let { user_id, res_id, amount } = req.body;
  try {
   
    const existingRate = await model.rate_res.findOne({where: { user_id, res_id }});
    // Check if user has already rated res or not
    if (existingRate) {
      return responseData(res, "User has already rated this restaurant.", 400, "");
    }

    // Create new rate in rate_res table
    const date_rate = new Date();
    await model.rate_res.create({ user_id, res_id, amount, date_rate });

    return responseData(res, "Create rate successfully.", 201, "");
  } catch (error) {
    console.error(`Error when creating new rate: ${error}`);
    return responseData(res, "System error", 500, "");
  }
};

// Get rates by restaurant_id
const getRatesByResId = async (req, res) => {
  let { res_id } = req.params;

  try {
    // Check if res_id exists in the restaurant table
    const restaurant = await model.restaurants.findOne({ where: { res_id } });

    if (!restaurant) {
      // If res_id doesn't exist, return error response
      return responseData(res, `Restaurant with id ${res_id} not found`, 404, "");
    }

    const data = await model.rate_res.findAll({where: {res_id}});
    return responseData(res, `Successfully get rates for the restaurant id ${res_id}`, 200, data);
  } catch (error) {
    console.error(`Error when getting rates by restaurant ID: ${error}`);
    return responseData(res, "System error", 500, "");
  }
};

// Get rates by user_id
const getRatesByUserId = async (req, res) => {
  let { user_id } = req.params;
  try {
    // Check if res_id exists in the restaurant table
    const user = await model.users.findOne({ where: { user_id } });

    if (!user) {
      // If res_id doesn't exist, return error response
      return responseData(res, `User with id ${user_id} not found`, 404, "");
    }

    const data = await model.rate_res.findAll({where: {user_id}});
    responseData(res, `Successfully get rates for the user id ${user_id}`, 200, data);
    return;
  } catch (error) {
    console.error(`Error when getting rates by user_id: ${error}`);
    responseData(res, "System error", 500, "");
  }
};

export { rateRes, getRatesByResId, getRatesByUserId };
