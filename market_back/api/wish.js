const express = require("express");
const router = express();

const { verifyToken } = require("../jwt");
const { Wish, Product, sequelize } = require("../models");

// 찜 목록
router.get("/", verifyToken, async (req, res, next) => {
  const offset = (req.query.page - 1) * 6;
  try {
    const findAndCountAllWish = await Wish.findAndCountAll({
      include: [
        {
          model: Product,
          attributes: [
            "id",
            "name",
            "price",
            "address",
            "img",
            [
              sequelize.literal(
                `(SELECT COUNT(*) FROM wishes where wishes.productId = product.id)`
              ),
              "wishes",
            ],
            [
              sequelize.literal(
                `(SELECT COUNT(*) FROM comments where comments.productId = product.id)`
              ),
              "comments",
            ],
          ],
        },
      ],
      where: {
        userId: req.decoded.id,
      },
      limit: 6,
      offset,
    });
    return res.send(findAndCountAllWish);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const findWish = await Wish.findOne({
      where: {
        userId: req.decoded.id,
        productId: req.body.productId,
      },
    });
    if (findWish) {
      try {
        await Wish.destroy({
          where: {
            userId: req.decoded.id,
            productId: req.body.productId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Wish.create({
          userId: req.decoded.id,
          productId: req.body.productId,
        });
      } catch (error) {
        console.log(error);
      }
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
