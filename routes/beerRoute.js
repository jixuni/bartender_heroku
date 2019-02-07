const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/between/:start/:end", async (req, res) => {
  let beer = await db.Beer.findAll({
    where: {
      id: { [db.Sequelize.Op.between]: [req.params.start, req.params.end] }
    },
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

router.get("/search/category/:id", async (req, res) => {
  let beer = await db.Beer.findAll({
    where: {
      category_id: req.params.id
    },
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

router.get("/search/:name", async (req, res) => {
  let beer = await db.Beer.findAll({
    where: {
      name: { [db.Sequelize.Op.like]: `%${req.params.name.toLowerCase()}%` }
    },
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
    return res.status(404).send("Beer Not Found, it might have been removed");

  res.send(beer);
});

module.exports = router;
