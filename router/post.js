const express = require("express");
const router = express();
const multer = require("multer");

const { post, image } = require("../models");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const findAllPost = await post.findAll({
      include: image,
    });
    res.send(findAllPost);
  } catch {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const findOnePost = await post.findOne({
      include: image,
      where: {
        id: req.params.id,
      },
    });
    res.send(findOnePost);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", upload.array("images"), async (req, res, next) => {
  const { text } = req.body;
  try {
    const createPost = await post.create({ text });
    if (req.files.length) {
      const images = req.files.map((image) => ({ path: image.path.replace("public", "http://localhost:3000"), PostId: createPost.id }));
      await image.bulkCreate(images);
    }
  } catch (error) {}
});

module.exports = router;
