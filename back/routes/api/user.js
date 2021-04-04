const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");

const User = require("../../models").User;

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      where: { user: req.decoded.user },
    });
    console.log(findUser.dataValues);
    return res.status(200).send(findUser.dataValues);
  } catch (error) {
    return res.status(401).send("");
  }
});

module.exports = router;
