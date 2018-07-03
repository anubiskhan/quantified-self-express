exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE mealfoods(
    meal_id INT REFERENCES meals(id) ON DELETE CASCADE,
    food_id INT REFERENCES foods(id) ON DELETE CASCADE
  )`
  return knex.raw(createQuery)
}

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE mealfoods`
  return knex.raw(dropQuery)
}
