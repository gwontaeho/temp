const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const { verifyToken } = require("../../middlewares/jwt");

const Class = require("../../models").Class;

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

router.post("/modify", verifyToken, async (req, res, next) => {
  console.log(req.body);
  try {
    await Class.update(
      {
        class: req.body.newName,
        price: req.body.newPrice,
        time: req.body.newTime,
      },
      { where: { id: req.body.classId } }
    );
    return res.status(200).send("CLASS INFO MODIFY SUCCESS");
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
