const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

class Mealfood {

  static add(req) {
    return database("mealfoods")
      .insert({
        meal_id: `${req.params.id}`,
        food_id: `${req.body.food.id}`
      })
      .returning("*")
  };

  static delete(req) {
    return database("mealfoods")
      .where({
        meal_id: `${req.params.id}`
      })
      .andWhere({
        food_id: `${req.body.food.id}`
      })
      .del()
  };

};

module.exports = Mealfood;
