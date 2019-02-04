const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const _ = require("lodash");
const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/all", [auth, admin], async (req, res) => {
  //QUERY DATABASE FOR ALL USERS, RETURN ALL DATA EXCEPT PASSWORD
  const user = await db.User.findAll().map(user =>
    _.omit(user.dataValues, ["password"])
  );
  res.json(user);
});

router.get("/:id", auth, async (req, res) => {
  const user = await db.User.findOne({
    where: { id: req.user.id },
    attributes: ["email", "name", "id"]
  });
  res.send(user);
});

router.post("/new", async (req, res) => {
  //   VALIDATE THE INPUT FROM THE FORM IS VALID BEFORE SENDING TO DB
  const { error } = db.User.validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK TO MAKE SURE THE EMAIL DOES NOT ALREADY EXIST IN THE DB
  let user = await db.User.findOne({
    where: { email: req.body.email }
  });
  if (user) return res.status(400).send("User already registered.");

  try {
    req.body.password = await bcryptjs.hash(req.body.password, 10);
    user = await db.User.create(
      _.pick(req.body, ["name", "email", "password"])
    );

    const token = jwt.sign(
      _.pick(user.dataValues, ["id", "name"]),
      config.get("jwtPrivateKey")
    );

    res
      .header("x-auth-token", token)
      .header("Acccess-Control-Expose-Headers", "x-auth-token")
      .send(token);
  } catch (ex) {
    res.status(500).send("error");
  }
});

module.exports = router;
