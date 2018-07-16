const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

class Favoritefood {
  static all() {
    return database.raw(
      `SELECT timesEaten, json_agg(json_build_object('name', name, 'calories', calories)) AS foods
       FROM
       (
         SELECT foods.name, foods.calories, COUNT(foods.id) AS timesEaten
         FROM foods
         LEFT JOIN mealfoods ON foods.id = mealfoods.food_id
         GROUP BY foods.id
         ORDER BY timesEaten DESC
       ) joinsQuery
       GROUP BY timesEaten
       ORDER BY timesEaten DESC`
    )
  }
}
module.exports = Favoritefood;
