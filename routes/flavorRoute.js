const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", async (req, res) => {
  const flavor = await db.Flavor.findAll();
  res.send(flavor);
});

module.exports = router;
