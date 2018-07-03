const express = require("express");
const router = express.Router();
const Food = require("../models/food.js");

class foodsController {

  static index(req, res, next) {
    Food.all()
    .then(foods => {
      if (!foods) {
        return res.sendStatus(404).json({"message": "Unable to find any foods"});
      } else {
        return res.status(200).json(foods);
      }
    });
  }

  static show(req, res, next) {
    Food.find(req)
    .then(food => {
      if (food.empty) {
        return res.sendStatus(404).json({"message": "Cannot find that food"});
      } else {
        return res.status(200).json(food);
      }
    });
  }

  static create(req, res, next) {
    Food.create(req)
    .then(food => {
      if (food.empty) {
        return res.sendStatus(400).json({"message": "Unable to create the food"});
      } else {
        return res.status(200).json(food);
      }
    });
  }

  static update(req, res, next) {
    Food.update(req)
    .then(food => {
      if (food.empty) {
        return res.sendStatus(404).json({"message": "Unable to update the food"});
      } else {
        return res.status(200).json(food);
      }
    });
  }

  static delete(req, res, next) {
    Food.delete(req)
    .then(food => {
      if (food.empty) {
        return res.sendStatus(404).json({"message": "Food has NOT been deleted"});
      } else {
        return res.status(200).json({"message": "Food has been deleted"});
      }
    });
  }

}

module.exports = foodsController;
