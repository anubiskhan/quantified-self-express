const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe.js");
const Food = require("../models/food.js");
var pry = require('pryjs')

class recipesController {
  static show(req, res, next) {
    Food.find(req)
    .then(food => {
      if (food.empty) {
        return res.sendStatus(404).json({"message": "Cannot find that food"});
      } else {
        const recipes = Recipe.find(food)
        // eval(pry.it)
        .then(recipes => res.status(200).json(recipes))
      }
    });
  }
}
module.exports = recipesController;
