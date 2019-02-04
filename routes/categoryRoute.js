const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", async (req, res) => {
  const category = await db.Category.findAll();
  res.send(category);
});

module.exports = router;
