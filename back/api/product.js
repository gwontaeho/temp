const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const { Op } = require("sequelize");

const { sequelize, Seller, Product, Schedule, Review } = require("../models");
const { verifyToken } = require("../jwt");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "public/img/product/");
    },
    filename(req, file, done) {
      done(
        null,
        req.decoded.id +
          "_" +
          String(new Date().getTime()) +
          path.extname(file.originalname)
      );
    },
  }),
});

router.get("/main", async (req, res, next) => {
  ////////////////////////////////////////////////////////////////////////
  //  메인
  ////////////////////////////////////////////////////////////////////////
  try {
    const popProduct = await Product.findAll({
      include: [
        {
          model: Review,
          attributes: [
            "productId",
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
      attributes: { exclude: ["detail"] },
      subQuery: false,
      group: ["id"],
      order: [["sold", "DESC"]],
      limit: 10,
    });
    const newProduct = await Product.findAll({
      include: [
        {
          model: Review,
          attributes: [
            "productId",
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
      attributes: { exclude: ["detail"] },
      subQuery: false,
      group: ["id"],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    return res.status(200).send({ popProduct, newProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.get("/category", async (req, res, next) => {
  /////////////////////////////////////////////////////////////////
  //  카테고리
  /////////////////////////////////////////////////////////////////
  let category = "";
  switch (req.query.name) {
    case "all":
      category = { [Op.ne]: null };
      break;
    case "flower":
      category = "플라워";
      break;
    case "art":
      category = "미술";
      break;
    case "cooking":
      category = "요리";
      break;
    case "handmade":
      category = "수공예";
      break;
    case "activity":
      category = "액티비티";
      break;
    case "etc":
      category = "기타";
      break;
    default:
      break;
  }

  let order = [[]];
  switch (req.query.sort) {
    case "rating":
      order = [["reviews", "rating", "DESC"]];
      break;
    case "sold":
      order = [["sold", "DESC"]];
      break;
    case "low":
      order = [["price", "ASC"]];
      break;
    case "high":
      order = [["price", "DESC"]];
      break;
    default:
      break;
  }
  try {
    const findClass = await Product.findAll({
      include: [
        {
          model: Review,
          attributes: [
            "productId",
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
        category,
      },
      group: ["id"],
      order: order,
    });
    return res.status(200).json(findClass);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.get("/seller", verifyToken, async (req, res, next) => {
  ///////////////////////////////////////////////////////////////////////
  //  판매자 전체 클래스
  ///////////////////////////////////////////////////////////////////////
  try {
    const findAllProduct = await Product.findAll({
      where: { sellerId: req.decoded.id },
    });
    const response = findAllProduct.map((v) => {
      return v.dataValues;
    });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send();
  }
});

router.get("/seller/:id", verifyToken, async (req, res, next) => {
  ///////////////////////////////////////////////////////////////////////
  //  판매자 클래스 상세
  ///////////////////////////////////////////////////////////////////////
  try {
    const findProduct = await Product.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).send(findProduct.dataValues);
  } catch (error) {
    return res.status(500).send();
  }
});

router.get("/:id", async (req, res, next) => {
  /////////////////////////////////////////////////////////////////////
  //  클래스 상세정보
  /////////////////////////////////////////////////////////////////////
  try {
    const findProduct = await Product.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Schedule,
          where: {
            ymd: {
              [Op.gt]: req.query.today,
            },
          },
          required: false,
        },
        {
          model: Seller,
          attributes: ["company", "img", "introduce"],
        },
        {
          model: Review,
        },
      ],
      order: [
        [Schedule, "ymd", "DESC"],
        [Schedule, "start", "ASC"],
      ],
    });

    return res.status(200).send(findProduct.dataValues);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

////////////////////////////////////////////////////////////////
//  판매자 클래스 생성
////////////////////////////////////////////////////////////////
router.post("/", verifyToken, upload.single("img"), async (req, res, next) => {
  try {
    await Product.create({
      name: req.body.name,
      price: req.body.price,
      time: req.body.time,
      img: req.file.path,
      address: req.body.address,
      category: req.body.category,
      detail: req.body.detail,
      sellerId: req.decoded.id,
    });
    res.status(200).send();
  } catch (error) {
    fs.unlink(req.file.path, (error) => {
      if (error) console.log(error);
    });
    res.status(500).send();
  }
});

///////////////////////////////////////////////////////////////////////////////
//  판매자 클래스 업데이트
///////////////////////////////////////////////////////////////////////////////
router.put(
  "/update",
  verifyToken,
  upload.single("img"),
  async (req, res, next) => {
    try {
      await Product.update(
        {
          img:
            req.body.imgCheck === "false"
              ? req.body.originalImg
              : req.file.path,
          name: req.body.name,
          price: req.body.price,
          time: req.body.time,
          address: req.body.address,
          detail: req.body.detail,
          category: req.body.category,
        },
        { where: { id: req.body.productId } }
      );
      if (req.body.imgCheck === "true") {
        fs.unlink(req.body.originalImg, (error) => {
          if (error) console.log(error);
        });
      }
      return res.status(200).send();
    } catch (error) {
      if (req.file)
        fs.unlink(req.file.path, (error) => {
          if (error) console.log(error);
        });
      return res.status(500).send();
    }
  }
);

module.exports = router;
