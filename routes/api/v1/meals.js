const express = require("express");
const router = express.Router();
const mealsController = require("../../../controllers/mealsController.js");
const mealfoodsController = require("../../../controllers/mealfoodsController.js");

// GET all meals
router.get("/", mealsController.index)

// GET foods for a meal by meal id
router.get("/:id/foods", mealsController.show)

// // POST to meal to add food
router.post("/:id/foods", mealfoodsController.create)

// // DELETE an existing food from a meal
// router.delete("/:id/foods", mealfoodsController.show)

module.exports = router;
