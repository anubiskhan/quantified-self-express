const express = require("express");
const router = express.Router();
const Meal = require("../models/meal.js");

class mealsController {

  static index(req, res, next) {
    Meal.all()
    .then(meals => {
      if (!meals) {
        return res.sendStatus(404).json({"message": "Unable to find any meals"});
      } else {
        return res.status(200).json(meals);
      }
    });
  }

  static show(req, res, next) {
    Meal.find(req)
    .then(meals => {
      if (!meals) {
        return res.sendStatus(404).json({"message": "Unable to find the meal"});
      } else {
        return res.status(200).json(meals);
      }
    });
  }

}

module.exports = mealsController;
