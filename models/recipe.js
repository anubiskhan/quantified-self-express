const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);
const fetch = require("node-fetch");
var pry = require("pryjs");

class Recipe {
  static find(food) {
    const name = food.name;
    return fetch(
      `http://api.yummly.com/v1/api/recipes?_app_id=3ab07f87&_app_key=505ffabc869d3a118cf6ff6fdea34798&q=${name}&maxResult=10`,
      { headers: { "Content-Type": "application/json" } }
    )
      .then(response => {
        return response.json();
      })
      .then(recipes => {
        return recipes.matches.map(recipe => {
          return {
            name: recipe.recipeName,
            url: `http://www.yummly.com/recipe/${recipe.id}`
          };
        });
      });
  }
}
module.exports = Recipe;
