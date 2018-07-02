const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

router.get("/", function(req, res, next) {
  database.raw("SELECT * FROM foods").then(foods => {
    if (!foods.rows) {
      return res.sendStatus(404);
    } else {
      return res.status(200).json(foods.rows);
    }
  });
});

router.get("/:id", function(req, res, next) {
  database.raw("SELECT * FROM foods WHERE id=?", req.params.id).then(food => {
    if (food.rows.empty) {
      return res.sendStatus(404);
    } else {
      return res.status(200).json(food.rows);
    }
  });
});

module.exports = router;
