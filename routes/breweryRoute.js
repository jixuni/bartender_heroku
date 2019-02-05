const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", async (req, res) => {
  const brewery = await db.Brewery.findAll();
  res.send(brewery);
});

router.get("/:id", async (req, res) => {
  const brewery = await db.Brewery.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.Country,
        attributes: ["id", "name"]
      }
    ]
  });
  if (!brewery)
    return res
      .status(404)
      .send("Brewery Not Found, it might have been removed");
  res.send(brewery);
});

module.exports = router;
