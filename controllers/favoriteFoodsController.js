const express = require("express");
const router = express.Router();
const favoriteFood = require("../models/favoriteFood.js");

class favoriteFoodsController {

  static index(req, res, next) {
    Favoritefood.all()
      .then(favs => {
        return res.status(200).json(favs);
      });
    }
}

module.exports = favoriteFoodsController;
