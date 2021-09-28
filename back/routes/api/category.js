const express = require("express");
const router = express.Router();
const { sequelize, Seller } = require("../../models");
const { Op } = require("sequelize");

const Class = require("../../models").Class;
const Review = require("../../models").Review;

router.post("/", async (req, res, next) => {
  console.log(req.body);
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
      order:
        req.body.sort === "rating"
          ? [["reviews", "rating", "DESC"]]
          : req.body.sort === "sold"
          ? [["sold", "DESC"]]
          : req.body.sort === "lowPrice"
          ? [["price", "ASC"]]
          : [["price", "DESC"]],
    });
    return res.status(200).json(findClass);
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
