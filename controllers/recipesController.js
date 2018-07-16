const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe.js");

class recipesController {
  static show(req, res, next) {
    Recipe.find(req, function(recipes) {
      res.json(recipes.matches.slice(0, 9));
    });
  }
}
module.exports = recipesController;
