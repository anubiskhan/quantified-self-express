const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

// GET all foods
router.get("/", function(req, res, next) {
  database("foods")
  .select("*")
  .then(foods => {
    if (!foods) {
      return res.sendStatus(404);
    } else {
      return res.status(200).json(foods);
    }
  });
});

// GET single food by id
router.get("/:id", function(req, res, next) {
  database("foods")
  .where("id", req.params.id)
  .then(food => {
    if (food.empty) {
      return res.sendStatus(404);
    } else {
      return res.status(200).json(food);
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
    .then(food => {
      if (food.empty) {
        return res.sendStatus(400);
      } else {
        return res.status(200).json(food);
      }
    });
});

// PATCH an existing food
router.put("/:id", function(req, res, next) {
  database("foods")
  .where("id", req.params.id)
  .update({
    name: `${req.body.food.name}`,
    calories: `${req.body.food.calories}`
  })
  .returning(["id", "name", "calories"])
  .then(food => {
    if (food.empty) {
      return res.sendStatus(404);
    } else {
      return res.status(204).json(food);
    }
  });
});

// DELETE an existing food
router.delete("/:id", function(req, res, next) {
  database("foods")
  .where("id", req.params.id)
  .del()
  .then(food => {
    return res.status(204);
  });
});

module.exports = router;
