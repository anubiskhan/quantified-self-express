const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

class Food {

  static all() {
    return database("foods")
    .select("*");
  };

  static find(req) {
    return database("foods")
    .where("id", req.params.id);
  };

  static create(req) {
    return database("foods")
      .insert({
        name: `${req.body.food.name}`,
        calories: `${req.body.food.calories}`
      })
      .returning("*")
  };

  static update(req) {
    return database("foods")
    .where("id", req.params.id)
    .update({
      name: `${req.body.food.name}`,
      calories: `${req.body.food.calories}`
    })
    .returning("*")
  };

  static delete(req) {
    return database("foods")
    .where("id", req.params.id)
    .del()
  };
};

module.exports = Food;
