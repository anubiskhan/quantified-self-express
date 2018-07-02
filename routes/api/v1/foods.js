const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

// GET all foods
router.get("/", function(req, res, next) {
  database.raw("SELECT * FROM foods").then(foods => {
    if (!foods.rows) {
      return res.sendStatus(404);
    } else {
      return res.status(200).json(foods.rows);
    }
  });
});

// GET single food by id
router.get("/:id", function(req, res, next) {
  database.raw("SELECT * FROM foods WHERE id=?", req.params.id).then(food => {
    if (food.rows.empty) {
      return res.sendStatus(404);
    } else {
      return res.status(200).json(food.rows);
    }
  });
});

// POST a new food
router.post("/", function(req, res, next) {
  database("foods")
    .insert({
      name: `${req.body.food.name}`,
      calories: `${req.body.food.calories}`
    })
    .returning(["id", "name", "calories"])
    // database.raw(
    //   "INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING *",
    //   [req.body.food.name, req.body.food.calories]
    // )
    .then(food => {
      if (food.empty) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(food);
      }
    });
});

// PATCH an existing food
router.patch("/", function(req, res, next) {
  database
    .raw(
      "UPDATE foods SET (name, calories) VALUES (?, ?) WHERE id = ? RETURNING *",
      // "UPDATE foods (name, calories) VALUES (?, ?) where id=? RETURNING *",
      [req.body.food.name, req.body.food.calories, req.params.id]
    )
    .then(food => {
      if (food.empty) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(food.rows);
      }
    });
});

// DELETE an existing food

module.exports = router;
