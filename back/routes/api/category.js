const express = require("express");
const router = express.Router();
const { sequelize, Seller } = require("../../models");
const { Op } = require("sequelize");

const Class = require("../../models").Class;
const Review = require("../../models").Review;

router.post("/", async (req, res, next) => {
  let order = [[]];
  console.log(req.body.sort);
  switch (req.body.sort) {
    case "rating":
      order = [["reviews", "rating", "DESC"]];
      break;
    case "sold":
      order = [["sold", "DESC"]];
      break;
    case "lowPrice":
      order = [["price", "ASC"]];
      break;
    case "highPrice":
      order = [["price", "DESC"]];
      break;
    default:
      break;
  }
  console.log(order);

  try {
    const findClass = await Class.findAll({
      include: [
        {
          model: Review,
          attributes: [
            "classId",
            [
              sequelize.fn(
                "round",
                sequelize.fn("avg", sequelize.col("rating")),
                1
              ),
              "rating",
            ],
          ],
        },
      ],
      where: {
        category:
          req.body.category === "all" ? { [Op.ne]: null } : req.body.category,
      },
      group: ["id"],
      order: order,
    });
    return res.status(200).json(findClass);
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
