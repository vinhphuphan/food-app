import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/config.js";

const model = initModels(sequelize);
// Like function
const likeRes = async (req, res) => {
  let { user_id, res_id } = req.body;

  try {
    // Check if user has already liked res or not
    const existingLike = await model.like_res.findOne({
      where: { user_id, res_id },
    });

    if (existingLike) {
      return responseData(res, "User has already liked this restaurant.", 400, null);
    }

    // Create new like in like_res table
    const date_like = new Date();
    const new_like = await model.like_res.create({ user_id, res_id, date_like });

    return responseData(res, "Create like successfully.", 200, new_like);
  } catch (error) {
    console.error(`Error when adding new like: ${error}`);
    return responseData(res, "Failed to create like for the restaurant.", 500, null);
  }
};

// Unlike function
const unlikeRes = async (req, res) => {
  let { user_id, res_id } = req.body;

  try {
    // Check if user has already liked res or not
    const existingLike = await model.like_res.findOne({
      where: { user_id, res_id },
    });

    if (!existingLike) {
      return responseData(res, "User has not liked this restaurant yet.", 400, null);
    }

    // Delete like in like_res table
    await model.like_res.destroy({
      where: { user_id, res_id },
    });

    return responseData(res, "Unlike successfully.", 200, null);
  } catch (error) {
    console.error(`Error when unliking restaurant: ${error}`);
    return responseData(res, "Failed to unlike restaurant.", 500, null);
  }
};

// Get likes by restaurant_id
const getLikesByResId = async (req, res) => {
  try {
    let { res_id } = req.params;
    const likes = await model.like_res.findAll({
      where: {
        res_id: res_id,
      },
    });
    return responseData(res, `Successfully get likes for the restaurant id ${res_id} `, 200, likes);
  } catch (error) {
    console.error(`Error when getting likes by restaurant ID: ${error}`);
    return responseData(res, `Failed to get likes for the restaurant id ${res_id}.`, 500, null);
  }
};

// Get likes by user_id
const getLikesByUserId = async (req, res) => {
  try {
    let { user_id } = req.params;
    const likes = await model.like_res.findAll({
      where: {
        user_id: user_id,
      },
    });
    return responseData(res, `Successfully get likes for the user id ${user_id}`, 200, likes);
  } catch (error) {
    console.error(`Error when getting likes by user_id: ${error}`);
    return responseData(res, `Failed to get likes for the user id ${user_id}`, 500, null);
  }
};

export { likeRes, unlikeRes, getLikesByResId, getLikesByUserId };
