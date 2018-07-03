const express = require("express");
const router = express.Router();
const mealsController = require("../../../controllers/mealsController.js");

// GET all meals
router.get("/", mealsController.index)

// GET foods for a meal by meal id
router.get("/:id/foods", mealsController.show)

// // POST to meal to add food
// router.post("/:id/foods", mealsController.update)

// // DELETE an existing food from a meal
// router.delete("/:id/foods", mealsController.show)

module.exports = router;
