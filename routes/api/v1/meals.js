const express = require("express");
const router = express.Router();
const mealsController = require("../../../controllers/mealsController.js");

// GET all meals
router.get("/", mealsController.index)

// // GET single food by id
// router.get("/:id", foodsController.show)
//
// // POST a new food
// router.post("/", foodsController.create)
//
// // PATCH || PUT to update an existing food
// router.patch("/:id", foodsController.update)
// router.put("/:id", foodsController.update)
//
// // DELETE an existing food
// router.delete("/:id", foodsController.delete)

module.exports = router;
