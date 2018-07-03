const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

class Meal {

  static all() {
    return database("meals")
    .select("*")
    .map(this.foodList);
  };

  static find(req) {
    return database("meals")
    .where("id", req.params.id)
    .select('id', 'name')
    .map(this.foodList)
    .then(rows => rows[0]);
  };

  static foodList(meal) {
    return database("foods")
    .select('foods.id', 'foods.name', 'foods.calories')
    .join('mealfoods', {'foods.id': 'mealfoods.food_id'})
    .where('mealfoods.meal_id', meal.id)
    .then(foods => {
      meal.foods = foods
      return meal
    })
  };
};

module.exports = Meal;
