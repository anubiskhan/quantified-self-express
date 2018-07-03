const express = require("express");
const router = express.Router();
const Food = require("../models/food.js");

class foodsController {
  static index(req, res, next) {
    Food.all()
    .then(foods => {
      if (!foods) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(foods);
      }
    });
  }
}

module.exports = foodsController;
