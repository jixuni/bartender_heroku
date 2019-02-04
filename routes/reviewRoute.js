const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/auth");

router.get("/beer/:beerId", async (req, res) => {
  const review = await db.Review.findAll({
    where: { beer_id: req.params.beerId },
    include: [
      {
        model: db.User,
        attributes: ["id", "name"]
      }
    ]
  });
  res.send(review);
});

router.get("/user/:userId", async (req, res) => {
  const review = await db.Review.findAll({
    where: { user_id: req.params.userId },
    include: [
      {
        model: db.User,
        attributes: ["id", "name"]
      },
      {
        model: db.Beer,
        attributes: ["id", "name"]
      }
    ]
  });
  res.send(review);
});

router.get("/:id", async (req, res) => {
  const review = await db.Review.findOne({ where: { id: req.params.id } });
  res.send(review);
});

router.put("/:id", auth, async (req, res) => {
  const review = await db.Review.findOne({
    where: { id: req.params.id }
  });

  if (!review)
    return res
      .status(404)
      .send("Review is not found, it may have been reomoved");
  if (review.user_id !== req.user.id)
    return res.status(401).send("Unauthorized");

  try {
    await db.Review.update(req.body, { where: { id: req.params.id } });
    res.send("Success");
  } catch (ex) {
    res.status(500).send("error");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const content = { ...req.body };
    content.user_id = req.user.id;
    await db.Review.create(content);
    res.send("Success");
  } catch (ex) {
    res.status(500).send("error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  const review = await db.Review.findOne({
    where: { id: req.params.id }
  });
  if (!review)
    return res
      .status(404)
      .send("Review is not found, it may have been reomoved");
  if (review.user_id !== req.user.id)
    return res.status(401).send("Unauthorized");

  try {
    await db.Review.destroy({ where: { id: req.params.id } });
    res.send("Success");
  } catch (ex) {
    res.status(500).send("error");
  }
});

module.exports = router;
