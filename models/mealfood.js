const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

class Mealfood {

  static add(req) {
    return database("mealfoods")
      .insert({
        meal_id: `${req.params.meal_id}`,
        food_id: `${req.params.food_id}`
      })
      .returning(["meal_id", "food_id"])
  };

  static delete(req) {
    return database("mealfoods")
      .where({
        meal_id: `${req.params.meal_id}`
      })
      .andWhere({
        food_id: `${req.params.food_id}`
      })
      .del()
  };

};

module.exports = Mealfood;
