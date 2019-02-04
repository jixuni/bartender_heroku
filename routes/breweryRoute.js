const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", async (req, res) => {
  const brewery = await db.Brewery.findAll();
  res.send(brewery);
});

module.exports = router;
