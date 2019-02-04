const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", async (req, res) => {
  const style = await db.Style.findAll();
  res.send(style);
});

module.exports = router;
