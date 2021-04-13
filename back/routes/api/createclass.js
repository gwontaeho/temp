const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");

const Class = require("../../models").Class;

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "public/img/class/");
    },
    filename(req, file, done) {
      done(
        null,
        req.decoded.user + "_" + req.nextIndex + path.extname(file.originalname)
      );
    },
  }),
});

const index = async (req, res, next) => {
  console.log(req.decoded.user);
  try {
    const findIndex = await Class.max("index", {
      where: { sellerSeller: req.decoded.user },
    });
    req.nextIndex = findIndex + 1;
    next();
  } catch (error) {
    return res.status(401).send("error");
  }
};

router.post(
  "/",
  verifyToken,
  index,
  upload.single("img"),
  async (req, res, next) => {
    if (req.file) {
      console.log(req.file.path);
    }
    console.log(req.body.name);
    console.log(req.body.price);
    console.log(req.body.time);
    // Object.keys(JSON.parse(req.body.schedule)).map((v) => {
    //   console.log(JSON.parse(req.body.schedule)[v]);
    // });
    try {
      await Class.create({
        class: req.body.name,
        price: req.body.price,
        time: req.body.time,
        img: req.file ? req.file.path : "",
        index: req.nextIndex,
        sellerSeller: req.decoded.user,
      });
      res.status(200).send("CLASS CREATE SUCCESS");
    } catch (error) {
      console.log(error);
      res.status(500).send("FAIL");
    }
  }
);

module.exports = router;
