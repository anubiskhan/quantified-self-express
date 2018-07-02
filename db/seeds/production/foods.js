exports.seed = function(knex, Promise) {
  return knex.raw("TRUNCATE foods RESTART IDENTITY")
    .then(function() {
      return Promise.all([
        knex.raw(
          "INSERT INTO foods (name, calories) VALUES (?, ?)",
          ["Cabbage", 40]
        ),
        knex.raw(
          "INSERT INTO foods (name, calories) VALUES (?, ?)",
          ["Bacon", 400]
        ),
        knex.raw(
          "INSERT INTO foods (name, calories) VALUES (?, ?)",
          ["Oats", 37]
        ),
        knex.raw(
          "INSERT INTO foods (name, calories) VALUES (?, ?)",
          ["Beer", 240]
        )
      ]);
    });
};
