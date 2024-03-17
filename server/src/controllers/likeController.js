import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/config.js";

const model = initModels(sequelize);

// Like function
const likeRes = async (req, res) => {
  let { user_id, res_id } = req.body;

  try {
    // Check if user has already liked res or not
    const existingLike = await model.like_res.findOne({where: { user_id, res_id }});

    if (existingLike) {
      return responseData(res, "User has already liked this restaurant.", 400, null);
    }

    // Create new like in like_res table
    const date_like = new Date();
    await model.like_res.create({ user_id, res_id, date_like });

    return responseData(res, "Create like successfully.", 201, "");
  } catch (error) {
    console.error(`Error when create like restaurant: ${error}`);
    return responseData(res, "System error", 500, "");
  }
};

// Unlike function
const unlikeRes = async (req, res) => {
  let { user_id, res_id } = req.body;

  try {
    // Check if user has already liked res or not
    const existingLike = await model.like_res.findOne({where: { user_id, res_id }});

    if (!existingLike) {
      return responseData(res, "User has not liked this restaurant yet.", 400, "");
    }

    // Delete like in like_res table
    await model.like_res.destroy({where: { user_id, res_id }});

    return responseData(res, "Unlike successfully.", 200, null);
  } catch (error) {
    console.error(`Error when unliking restaurant: ${error}`);
    return responseData(res, `System Error`, 500, null);
  }
};

// Get likes by restaurant_id
const getLikesByResId = async (req, res) => {
  let { res_id } = req.params;
  try {
    // Check if res_id exists in the restaurant table
    const restaurant = await model.restaurants.findOne({ where: { res_id } });

    if (!restaurant) {
      // If res_id doesn't exist, return error response
      return responseData(res, `Restaurant with id ${res_id} not found`, 404, "");
    }

    const data = await model.like_res.findAll({where: {res_id}});
    return responseData(res, `Successfully get likes for the restaurant id ${res_id} `, 200, data);
  } catch (error) {
    console.error(`Error when getting likes by restaurant ID: ${error}`);
    return responseData(res, `System Error`, 500, null);
  }
};

// Get likes by user_id
const getLikesByUserId = async (req, res) => {
  let { user_id } = req.params;
  try {
    // Check if user_id exists in the user table
    const user = await model.users.findOne({ where: { user_id } });

    if (!user) {
      // If user_id doesn't exist, return error response
      return responseData(res, `User with id ${user_id} not found`, 404, "");
    }

    const data = await model.like_res.findAll({where: {user_id}});
    responseData(res, `Successfully get likes for the user id ${user_id}`, 200, data);
    return;
  } catch (error) {
    console.error(`Error when getting likes by user_id: ${error}`);
    responseData(res, `System Error`, 500, null);
  }
};

export { likeRes, unlikeRes, getLikesByResId, getLikesByUserId };
