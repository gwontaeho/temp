const express = require("express");
const router = express.Router();
const { signToken } = require("../../middlewares/jwt");

const User = require("../../models").User;
const Seller = require("../../models").Seller;

router.post("/", async (req, res, next) => {
  if (req.body.type == 1) {
    try {
      const findUser = await User.findOne({
        where: { id: req.body.id },
        attributes: ["id", "password"],
      });
      if (findUser.dataValues.password !== req.body.password) {
        // 비밀번호 틀렸을 때
        return res.status(401).send("wrong password");
      }
      // 토근발급
      return res
        .status(200)
        .cookie("token", signToken(req.body.id, req.body.type))
        .send("success");
    } catch (error) {
      return res.status(401).send("error");
    }
  } else if (req.body.type == 2) {
    try {
      const findUser = await Seller.findOne({
        where: { id: req.body.id },
        attributes: ["id", "password"],
      });
      if (findUser.dataValues.password !== req.body.password) {
        // 비밀번호 틀렸을 때
        return res.status(401).send("wrong password");
      }
      // 토근발급
      return res
        .status(200)
        .cookie("token", signToken(req.body.id, req.body.type))
        .send("success");
    } catch (error) {
      return res.status(401).send("error");
    }
  }
});

module.exports = router;
