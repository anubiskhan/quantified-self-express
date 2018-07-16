const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

class Favoritefood {
  static all() {
    return database.raw(

      `SELECT
      T.timesEaten,
        json_agg(json_build_object('name',
        t.foodName, 'calories', t.calories))
      AS foods
      FROM (
        SELECT
          foods.id as foodId,
          foods.name as foodName,
          foods.calories as calories,
          count(foods.id) as timesEaten,
        SUM(foods.calories) as totalCalories
        FROM foods, mealfoods
        WHERE mealfoods.food_id = foods.id
        GROUP BY foodId
        ) as T
      GROUP BY timesEaten
      ORDER BY timesEaten DESC`
    );
  }
}
module.exports = Favoritefood;
