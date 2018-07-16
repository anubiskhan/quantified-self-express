const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);
const fetch = require('node-fetch');

class Recipe {
  static async find(req) {
    const record = await database('foods')
      .where("id", req.params.id)
      .first()
    const name = record.name
    const root = 'http://api.yummly.com/v1/api/recipes';
    const url = `${root}?_app_id=3ab07f87&_app_key=505ffabc869d3a118cf6ff6fdea34798&q=${name}`;
    const recipes = await fetch(url)

    return recipes;
  }
}
module.exports = Recipe;
