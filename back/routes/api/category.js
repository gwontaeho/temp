const express = require("express");
const router = express.Router();
const { sequelize } = require("../../models");

const Class = require("../../models").Class;
const Reservation = require("../../models").Reservation;
const Review = require("../../models").Review;

router.post("/all", async (req, res, next) => {
  try {
    const findClass = await Class.findAll({
      include: [
        {
          model: Review,
        },
      ],
      // attributes: {
      //   include: [
      //     [
      //       sequelize.fn(
      //         "round",
      //         sequelize.fn("avg", sequelize.col("reviews.rating")),
      //         1
      //       ),
      //       "rating",
      //     ],

      //   ],
      // },
      // group: "id",
    });
    console.log(findClass);
    return res.status(200).json(findClass);
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
