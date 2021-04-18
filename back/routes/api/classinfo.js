const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");

const Class = require("../../models").Class;

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const findUser = await Class.findOne({
      where: { sellerSeller: req.decoded.user, index: req.body.index },
    });
    console.log(findUser.dataValues);
    return res.status(200).json(findUser.dataValues);
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
