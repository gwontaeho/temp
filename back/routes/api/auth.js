const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");
const User = require("../../models").User;
const Seller = require("../../models").Seller;

router.post("/type", verifyToken, (req, res, next) => {
  return res.status(200).json({ type: req.decoded.type });
});

router.post("/user", verifyToken, async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      where: { id: req.decoded.id },
    });
    console.log(findUser);
    return res.status(200).send("success");
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/seller", verifyToken, async (req, res, next) => {
  try {
    const findSeller = await Seller.findOne({
      where: { id: req.decoded.id },
    });
    return res.status(200).send(findSeller.dataValues);
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
