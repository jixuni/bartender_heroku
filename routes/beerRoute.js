const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", async (req, res) => {
  let beer = await db.Beer.findAll({
    include: [
      {
        model: db.Brewery,
        attributes: ["id", "name"]
      },
      db.Category,
      db.Style,
      db.Flavor
    ]
  });
  res.send(beer);
});

router.get("/:id", async (req, res) => {
  const beer = await db.Beer.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.Brewery,
        attributes: ["id", "name"]
      },
      db.Category,
      db.Style,
      db.Flavor
    ]
  });
  if (!beer)
    return res.status(401).send("Beer Not Found, it might have been removed");

  res.send(beer);
});

module.exports = router;
