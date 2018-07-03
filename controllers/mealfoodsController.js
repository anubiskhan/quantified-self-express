const express = require("express");
const router = express.Router();
const Mealfood = require("../models/mealfood.js");

class mealfoodsController {

  static create(req, res, next) {
    Mealfood.add(req)
    .then(meals => {
      if (!meals) {
        return res.sendStatus(404).json({"message": "Unable to add food to meal"});
      } else {
        return res.status(201).json({
          "message": "Successfully added FOODNAME to MEALNAME"
        });
      }
    });
  }

  static delete(req, res, next) {
    Mealfood.delete(req)
    .then(meals => {
      if (!meals) {
        return res.sendStatus(404).json({"message": "Unable to delete food to meal"});
      } else {
        return res.json({
          "message": "Successfully removed FOODNAME to MEALNAME"
        });
      }
    });
  }

}

module.exports = mealfoodsController;
