const express = require("express");
const router = express.Router();
const { signToken } = require("../../middlewares/jwt");

const User = require("../../models").User;

router.post("/", async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      where: { user: req.body.user },
      attributes: ["user", "password"],
    });
    if (findUser.dataValues.password !== req.body.password) {
      // 비밀번호 틀렸을 때
      return res.status(401).send("wrong password");
    }
    // 토근발급
    return res.status(200).cookie("token", signToken(findUser)).send("success");
  } catch (error) {
    console.log(error);
    return res.status(401).send("error");
  }
});

module.exports = router;
