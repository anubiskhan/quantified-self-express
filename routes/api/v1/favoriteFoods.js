const express = require("express");
const router = express.Router();
const favoriteFoodsController = require("../../../controllers/favoriteFoodsController.js");

// GET favorite foods
router.get("/", favoriteFoodsController.index)

module.exports = router;
