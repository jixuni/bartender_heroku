const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", async (req, res) => {
  const country = await db.Country.findAll();
  res.send(country);
});

module.exports = router;
