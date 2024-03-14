import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _food_types from  "./food_types.js";
import _foods from  "./foods.js";
import _like_res from  "./like_res.js";
import _orders from  "./orders.js";
import _rate_res from  "./rate_res.js";
import _restaurants from  "./restaurants.js";
import _sub_food from  "./sub_food.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const food_types = _food_types.init(sequelize, DataTypes);
  const foods = _foods.init(sequelize, DataTypes);
  const like_res = _like_res.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const rate_res = _rate_res.init(sequelize, DataTypes);
  const restaurants = _restaurants.init(sequelize, DataTypes);
  const sub_food = _sub_food.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  restaurants.belongsToMany(users, { as: 'user_id_users', through: like_res, foreignKey: "res_id", otherKey: "user_id" });
  restaurants.belongsToMany(users, { as: 'user_id_users_rate_res', through: rate_res, foreignKey: "res_id", otherKey: "user_id" });
  users.belongsToMany(restaurants, { as: 'res_id_restaurants', through: like_res, foreignKey: "user_id", otherKey: "res_id" });
  users.belongsToMany(restaurants, { as: 'res_id_restaurants_rate_res', through: rate_res, foreignKey: "user_id", otherKey: "res_id" });
  foods.belongsTo(food_types, { as: "type", foreignKey: "type_id"});
  food_types.hasMany(foods, { as: "foods", foreignKey: "type_id"});
  sub_food.belongsTo(foods, { as: "food", foreignKey: "food_id"});
  foods.hasMany(sub_food, { as: "sub_foods", foreignKey: "food_id"});
  like_res.belongsTo(restaurants, { as: "re", foreignKey: "res_id"});
  restaurants.hasMany(like_res, { as: "like_res", foreignKey: "res_id"});
  rate_res.belongsTo(restaurants, { as: "re", foreignKey: "res_id"});
  restaurants.hasMany(rate_res, { as: "rate_res", foreignKey: "res_id"});
  like_res.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(like_res, { as: "like_res", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  rate_res.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(rate_res, { as: "rate_res", foreignKey: "user_id"});

  return {
    food_types,
    foods,
    like_res,
    orders,
    rate_res,
    restaurants,
    sub_food,
    users,
  };
}
