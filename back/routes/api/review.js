const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");

const Review = require("../../models").Review;

router.post("/add", verifyToken, async (req, res, next) => {
  try {
    await Review.create({
      text: req.body.text,
      rating: req.body.rating,
      userId: req.decoded.id,
      classId: req.body.classId,
      reservationId: req.body.reservationId,
    });
    res.status(200).send("SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(500).send("FAIL");
  }
});

router.post("/modify", verifyToken, async (req, res, next) => {
  try {
    await Review.update(
      {
        text: req.body.text,
        rating: req.body.rating,
      },
      { where: { id: req.body.reviewId } }
    );
    res.status(200).send("SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(500).send("FAIL");
  }
});

router.post("/get", async (req, res, next) => {
  let result = [];
  try {
    const findAllReview = await Review.findAll({
      where: { classId: req.body.classId },
      order: [["createdAt", "Desc"]],
    });
    findAllReview.forEach((v) => {
      result.push(v.dataValues);
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
