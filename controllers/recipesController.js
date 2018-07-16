const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe.js");


class recipesController {
  static show(req, res, next) {
    return Recipe.find()
      .then(recipes => {
        return res.status(200).json(recipes.rows);
      });
    }
}

module.exports = recipesController;
