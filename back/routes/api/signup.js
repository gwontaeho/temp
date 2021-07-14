const express = require("express");
const router = express.Router();

const User = require("../../models").User;
const Seller = require("../../models").Seller;

router.post("/user", async (req, res, next) => {
  try {
    await User.create({
      id: req.body.id,
      password: req.body.password,
      name: req.body.name,
      birth: req.body.birth,
      gender: req.body.gender,
      phone: req.body.phone,
      type: 1,
    });
    res.status(200).send("USER SIGN UP SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(500).send("FAIL");
  }
});

router.post("/seller", async (req, res, next) => {
  try {
    await Seller.create({
      id: req.body.id,
      password: req.body.password,
      company: req.body.company,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      category: req.body.category,
      reg: req.body.reg,
      type: 2,
    });
    res.status(200).send("SELLER SIGN UP SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(500).send("FAIL");
  }
});

module.exports = router;
