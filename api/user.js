const express = require("express");
const router = express();

const { sequelize, User } = require("../models");
const { userUpload } = require("../multer");
const { signToken, verifyToken } = require("../jwt");
const s3 = require("../aws");

router.get("/", async (req, res, next) => {
  if (req.query.id === "admin" && req.query.password === "xogh0734")
    return res.send(signToken(req.query.id));
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

router.get("/admin", verifyToken, async (req, res, next) => {
  if (req.decoded.id === "admin") {
    try {
      const findAllUser = await User.findAll({
        attributes: [
          "id",
          "nickname",
          "createdAt",
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM products where products.userId = user.id and products.state = 0)`
            ),
            "sale",
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM products where products.userId = user.id and products.state = 1 and products.state = 2)`
            ),
            "sold",
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM products where products.buyer = user.id)`
            ),
            "purchase",
          ],
        ],
      });
      return res.send(findAllUser);
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.sendStatus(400);
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
  userUpload.single("img"),
  async (req, res, next) => {
    if (req.file) {
      try {
        const updateUser = await User.update(
          {
            img: req.file.location,
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

        const key =
          findOneUser.dataValues.img.split("/")[3] +
          "/" +
          findOneUser.dataValues.img.split("/")[4];

        s3.deleteObject(
          {
            Bucket: "taeho-market",
            Key: key,
          },
          function (err, data) {}
        );
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
