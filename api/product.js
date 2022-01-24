const express = require("express");
const router = express();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const path = require("path");
const fs = require("fs");

const { verifyToken } = require("../jwt");
const { sequelize, Product, User, Wish, Comment } = require("../models");
const { Op } = require("sequelize");

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/image/product/");
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         req.decoded.id +
//           "_" +
//           new Date().valueOf() +
//           path.extname(file.originalname)
//       );
//     },
//   }),
// });

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "taeho-market",
    key(req, file, cb) {
      const fileName =
        req.decoded.id +
        "_" +
        new Date().valueOf() +
        path.extname(file.originalname);
      cb(null, `product/${fileName}`);
    },
  }),
});

// 메인
router.get("/", async (req, res, next) => {
  let popularProduct;
  let newProduct;

  try {
    popularProduct = await Product.findAll({
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
      where: {
        state: "0",
      },
      order: sequelize.literal("wishes DESC"),
      limit: 10,
    });
  } catch (error) {
    console.log(error);
  }

  try {
    newProduct = await Product.findAll({
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
      where: {
        state: "0",
      },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
  } catch (error) {
    console.log(error);
  }

  return res.send({ popularProduct, newProduct });
});

// 판매내역
router.get("/sale", verifyToken, async (req, res, next) => {
  const offset = (req.query.page - 1) * 6;
  const state = req.query.state === "0" ? 0 : [1, 2];
  try {
    const findAndCountAllProduct = await Product.findAndCountAll({
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
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM comments where comments.productId = product.id AND comments.answer IS NULL)`
          ),
          "unanswered",
        ],
      ],
      where: {
        userId: req.decoded.id,
        state,
      },
      offset,
      limit: 6,
    });
    res.send(findAndCountAllProduct);
  } catch (error) {
    console.log(error);
  }
});

// 구매내역
router.get("/purchase", verifyToken, async (req, res, next) => {
  const offset = (req.query.page - 1) * 6;
  try {
    const findAndCountAllProduct = await Product.findAndCountAll({
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
      where: {
        state: 2,
        buyer: req.decoded.id,
      },
      offset,
      limit: 6,
    });
    res.send(findAndCountAllProduct);
  } catch (error) {
    console.log(error);
  }
});

// 미확정 구매내역
router.get("/uncertain", verifyToken, async (req, res, next) => {
  const offset = (req.query.page - 1) * 3;
  try {
    const findAndCountAllProduct = await Product.findAndCountAll({
      where: {
        state: 1,
        buyer: req.decoded.id,
      },
      offset,
      limit: 3,
    });
    res.send(findAndCountAllProduct);
  } catch (error) {
    console.log(error);
  }
});

// 판매자 상품조회
router.get("/seller", async (req, res, next) => {
  const offset = (req.query.page - 1) * 6;
  try {
    const findAndCountAllProduct = await Product.findAndCountAll({
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
      where: {
        userId: req.query.userId,
        state: 0,
      },
      offset,
      limit: 6,
    });
    return res.send(findAndCountAllProduct);
  } catch (error) {
    console.log(error);
  }
});

router.post("/search", async (req, res, next) => {
  let keyword;
  let where = { state: 0 };
  if (!req.body.keyword) keyword = "";
  else {
    keyword = req.body.keyword.split(" ");
    console.log(keyword);
    if (keyword.length === 1) {
      where = {
        [Op.or]: [
          { address: { [Op.like]: `%${keyword[0]}%` } },
          { name: { [Op.like]: `%${keyword[0]}%` } },
        ],
        state: 0,
      };
    } else {
      where = {
        [Op.and]: [
          { address: { [Op.like]: `%${keyword[0]}%` } },
          { name: { [Op.like]: `%${keyword[1]}%` } },
        ],
        state: 0,
      };
    }
  }
  try {
    const findAndCountAllProduct = await Product.findAndCountAll({
      where,
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
    });
    return res.send(findAndCountAllProduct);
  } catch (error) {
    console.log(error);
  }
});

// 상품 상세
router.get("/:id", async (req, res, next) => {
  try {
    const findProduct = await Product.findOne({
      include: [
        {
          model: User,
        },
        {
          model: Wish,
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    if (findProduct) return res.send(findProduct);
    else return res.sendStatus(400);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", verifyToken, upload.array("img"), async (req, res, next) => {
  const img = JSON.stringify(
    req.files.map((file) => {
      return file.location;
    })
  );
  try {
    await Product.create({
      name: req.body.name,
      price: req.body.price,
      address: req.body.address,
      intro: req.body.intro,
      img,
      userId: req.decoded.id,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.put("/", verifyToken, upload.array("img"), async (req, res, next) => {
  let img;
  if (req.body.updateImg === "true") {
    img = JSON.stringify(
      req.files.map((file) => {
        return file.location;
      })
    );
    try {
      const findOneProduct = await Product.findByPk(req.body.id);
      JSON.parse(findOneProduct.dataValues.img).forEach((path) => {
        fs.unlink(path, (error) => {
          if (error) console.log(error);
        });
      });
    } catch (error) {
      console.log(error);
    }
  } else img = sequelize.literal("img");
  try {
    await Product.update(
      {
        name: req.body.name,
        price: req.body.price,
        address: req.body.address,
        intro: req.body.intro,
        img,
      },
      { where: { id: req.body.id, userId: req.decoded.id } }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.put("/1", verifyToken, async (req, res, next) => {
  const state = req.body.buyer === "" ? 2 : 1;
  const buyer = req.body.buyer === "" ? null : req.body.buyer;
  try {
    await Product.update(
      {
        state,
        buyer,
      },
      {
        where: { id: req.body.id, userId: req.decoded.id },
      }
    );
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.put("/2", verifyToken, async (req, res, next) => {
  const buyer = req.body.boolean ? sequelize.literal("buyer") : null;
  try {
    await Product.update(
      {
        state: 2,
        buyer,
      },
      {
        where: { id: req.body.id, buyer: req.decoded.id },
      }
    );
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
