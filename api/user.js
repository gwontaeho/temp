const express = require("express");
const router = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { signToken, verifyToken } = require("../jwt");
const { User } = require("../models");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/image/user/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        req.decoded.id +
          "_" +
          new Date().valueOf() +
          path.extname(file.originalname)
      );
    },
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const findOneUser = await User.findOne({
      where: {
        id: req.query.id,
      },
      attributes: ["password"],
    });
    if (findOneUser && findOneUser.password === req.query.password) {
      return res.send(signToken(req.query.id));
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/id", async (req, res, next) => {
  try {
    const findOneUser = await User.findOne({
      where: {
        id: req.query.id,
      },
      attributes: ["id"],
    });
    if (findOneUser) return res.send(false);
    else return res.send(true);
  } catch (error) {
    console.log(error);
  }
});

router.get("/nickname", async (req, res, next) => {
  try {
    const findOneUser = await User.findOne({
      where: {
        nickname: req.query.nickname,
      },
      attributes: ["nickname"],
    });
    if (findOneUser) return res.send(false);
    else return res.send(true);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const findOneUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (findOneUser) return res.send(findOneUser);
    else return res.sendStatus(400);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await User.create({
      id: req.body.id,
      password: req.body.password,
      nickname: req.body.nickname,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.put(
  "/img",
  verifyToken,
  upload.single("img"),
  async (req, res, next) => {
    if (req.file) {
      try {
        const updateUser = await User.update(
          {
            img: req.file.path,
          },
          {
            where: { id: req.decoded.id },
          }
        );
        return res.sendStatus(200);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const findOneUser = await User.findByPk(req.decoded.id);
        fs.unlink(findOneUser.dataValues.img, (error) => {
          if (error) console.log(error);
        });
      } catch (error) {
        console.log(error);
      }
      try {
        const updateUser = await User.update(
          {
            img: null,
          },
          {
            where: { id: req.decoded.id },
          }
        );
        return res.sendStatus(200);
      } catch (error) {
        console.log(error);
      }
    }
  }
);

router.put("/nickname", verifyToken, async (req, res, next) => {
  try {
    const updateUser = await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.decoded.id },
      }
    );
    if (updateUser[0] === 1) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.put("/password", verifyToken, async (req, res, next) => {
  try {
    const findOneUser = await User.findOne({
      where: {
        id: req.decoded.id,
      },
      attributes: ["password"],
    });

    if (findOneUser.password === req.body.password) {
      try {
        const updateUser = await User.update(
          {
            password: req.body.newPassword,
          },
          {
            where: { id: req.decoded.id },
          }
        );
        if (updateUser[0] === 1) {
          return res.sendStatus(200);
        } else {
          return res.sendStatus(400);
        }
      } catch (error) {
        return res.sendStatus(400);
      }
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    return res.sendStatus(400);
  }
});

module.exports = router;
