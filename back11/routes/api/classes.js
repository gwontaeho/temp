const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const { Op } = require("sequelize");

const { sequelize } = require("../../models");
const { verifyToken } = require("../../middlewares/jwt");
const Product = require("../../models").Product;
const Review = require("../../models").Review;

const index = async (req, res, next) => {
  console.log(req.decoded.id);
  try {
    const findIndex = await Class.max("index", {
      where: { sellerId: req.decoded.id },
    });
    if (findIndex >= 0) {
      req.nextIndex = findIndex + 1;
    } else {
      req.nextIndex = 0;
    }
    next();
  } catch (error) {
    return res.status(401).send("error");
  }
};

const modifyIndex = (req, res, next) => {
  console.log(req.headers.nextindex);
  req.nextIndex = req.headers.nextindex;
  next();
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "public/img/class/");
    },
    filename(req, file, done) {
      done(
        null,
        req.decoded.id +
          "_" +
          req.nextIndex +
          "_" +
          String(new Date().getTime()) +
          path.extname(file.originalname)
      );
    },
  }),
});

router.post("/", verifyToken, async (req, res, next) => {
  console.log(req.decoded);
  let result = [];
  try {
    const findAllClass = await Class.findAll({
      where: { sellerId: req.decoded.id },
    });
    findAllClass.forEach((v) => {
      result.push(v.dataValues);
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/class", verifyToken, async (req, res, next) => {
  try {
    const findUser = await Class.findOne({
      where: { sellerId: req.decoded.id, index: req.body.index },
    });
    console.log(findUser.dataValues);
    return res.status(200).json(findUser.dataValues);
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post(
  "/create",
  verifyToken,
  index,
  upload.single("img"),
  async (req, res, next) => {
    try {
      await Class.create({
        name: req.body.name,
        price: req.body.price,
        time: req.body.time,
        img: req.file ? req.file.path : "",
        address: req.body.address,
        category: req.body.category,
        detail: req.body.detail,
        index: req.nextIndex,
        sellerId: req.decoded.id,
      });
      res.status(200).send("CLASS CREATE SUCCESS");
    } catch (error) {
      console.log(error);
      res.status(500).send("FAIL");
    }
  }
);

router.post(
  "/modify",
  verifyToken,
  modifyIndex,
  upload.single("img"),
  async (req, res, next) => {
    console.log(req.body);
    if (req.body.imgCheck === "0") {
      try {
        await Class.update(
          {
            name: req.body.name,
            price: req.body.price,
            time: req.body.time,
            address: req.body.address,
            detail: req.body.detail,
          },
          { where: { id: req.body.classId } }
        );
        return res.status(200).send("success");
      } catch (error) {
        console.log(error);
      }
    } else if (req.body.imgCheck === "1") {
      fs.unlink(req.body.orgImg, (error) => {
        if (error) console.log(error);
        else console.log("deleted");
      });

      try {
        await Class.update(
          {
            img: req.file ? req.file.path : "",
            name: req.body.name,
            price: req.body.price,
            time: req.body.time,
            address: req.body.address,
            detail: req.body.detail,
          },
          { where: { id: req.body.classId } }
        );
        return res.status(200).send("success");
      } catch (error) {
        console.log(error);
      }
    }
  }
);

//////////////////////////////////////////////////////////////
router.post("/main", async (req, res, next) => {
  try {
    const popClass = await Product.findAll({
      attributes: ["id", "name", "address", "category", "price", "img"],
      order: [["sold", "DESC"]],
      limit: 10,
    });
    const newClass = await Product.findAll({
      attributes: ["id", "name", "address", "category", "price", "img"],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    return res.status(200).json({ popClass, newClass });
  } catch (error) {
    return res.status(401).send("error");
  }
});
//////////////////////////////////////////////////////////////

router.post("/product", async (req, res, next) => {
  try {
    const result = await Class.findOne({
      where: { id: req.body.id },
    });
    console.log(result.dataValues);
    return res.status(200).json(result.dataValues);
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/category", async (req, res, next) => {
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
