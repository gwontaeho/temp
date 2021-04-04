const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");

const Seller = require("../../models").Seller;

router.post("/", verifyToken, async (req, res, next) => {
  try {
    await Seller.create({
      company: req.body.company,
      address: req.body.address,
      reg: req.body.reg,
      category: req.body.category,
      userUser: req.decoded.user,
    });
    res.status(200).send("abc");
  } catch (error) {
    console.log(error);
    res.status(500).send("nono");
  }
});

module.exports = router;
