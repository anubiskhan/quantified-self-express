exports.seed = function(knex, Promise) {
  return knex.raw("TRUNCATE mealfoods RESTART IDENTITY CASCADE")
    .then(function() {
      return Promise.all([
        knex.raw(
          "INSERT INTO mealfoods (meal_id, food_id) VALUES (?, ?)",
          [1, 1]
        )
      ]);
    });
};
