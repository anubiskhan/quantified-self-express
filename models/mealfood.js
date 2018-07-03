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

};

module.exports = Mealfood;
