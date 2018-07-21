const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

class Favoritefood {
  static all() {
    return database.raw(

      `SELECT
      T.timesEaten,
        json_agg(json_build_object('name',
        t.foodName, 'calories', t.calories, 'mealsWhenEaten', meals))
      AS foods
      FROM (
        SELECT
          foods.id as foodId,
          foods.name as foodName,
          foods.calories as calories,
          count(foods.id) as timesEaten,
          array_agg(DISTINCT meals.name) AS meals
        FROM foods
        JOIN mealfoods ON foods.id = mealfoods.food_id
        JOIN meals ON meals.id = mealfoods.meal_id
        WHERE mealfoods.food_id = foods.id
        GROUP BY foodId
        ) as T
      GROUP BY timesEaten
      ORDER BY timesEaten DESC`
    );
  }
}
module.exports = Favoritefood;
