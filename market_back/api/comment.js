const express = require("express");
const router = express();

const { verifyToken } = require("../jwt");
const { Comment } = require("../models");

router.post("/", verifyToken, async (req, res, next) => {
  try {
    await Comment.create({
      userId: req.decoded.id,
      productId: req.body.productId,
      comment: req.body.comment,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.put("/", verifyToken, async (req, res, next) => {
  try {
    await Comment.update(
      { answer: req.body.answer },
      { where: { id: req.body.id } }
    );
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
