import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/config.js";

const model = initModels(sequelize);

const rateRes = async (req, res) => {
  let { user_id, res_id, amount } = req.body;

  try {
    // Check if user has already liked res or not
    const existingRate = await model.rate_res.findOne({
      where: { user_id, res_id }
    });

    if (existingRate) {
      return responseData(res, "User has already rated this restaurant.", 400, null);
    }

    // Create new rate in rate_res table
    const date_rate = new Date();
    const new_rate = await model.rate_res.create({ user_id, res_id, amount, date_rate });

    return responseData(res, "Create rate successfully.", 200, new_rate);
  } catch (error) {
    console.error(`Error when creating new rate: ${error}`);
    return responseData(res, "Failed to create new rate.", 500, null);
  }
};

const getRatesByResId = async (req, res) => {
  try {
    let { res_id } = req.params;
    const rates = await model.rate_res.findAll({
      where: {
        res_id: res_id,
      },
    });
    return responseData(res, `Successfully get rates for the restaurant id ${res_id} `, 200, rates);
  } catch (error) {
    console.error(`Error when getting rates by restaurant ID: ${error}`);
    return responseData(res, `Failed to get rates for the restaurant id ${res_id}.`, 500, null);
  }
};

const getRatesByUserId = async (req, res) => {
  try {
    let { user_id } = req.params;
    const rates = await model.rate_res.findAll({
      where: {
        user_id: user_id,
      },
    });
    return responseData(res, `Successfully get rates for the user id ${user_id}`, 200, rates);
  } catch (error) {
    console.error(`Error when getting rates by user_id: ${error}`);
    return responseData(res, `Failed to get rates for the user id ${user_id}`, 500, null);
  }
};

export { rateRes, getRatesByResId, getRatesByUserId };
