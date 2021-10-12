const express = require("express");
const router = express.Router();
const { verifyToken, signToken } = require("../../middlewares/jwt");
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
    return res.status(200).send(findUser.dataValues);
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

router.post("/user/modify", verifyToken, async (req, res, next) => {
  try {
    await User.update(
      { phone: req.body.phone },
      { where: { id: req.decoded.id } }
    );
    return res.status(200).send("success");
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/seller/modify", verifyToken, async (req, res, next) => {
  try {
    await Seller.update(
      {
        phone: req.body.phone,
        company: req.body.company,
        address: req.body.address,
        category: req.body.category,
      },
      { where: { id: req.decoded.id } }
    );
    return res.status(200).send("success");
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  if (req.body.type === 1) {
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
  } else if (req.body.type === 2) {
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

router.post("/create/user", async (req, res, next) => {
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

router.post("/create/seller", async (req, res, next) => {
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

router.post("/check", async (req, res, next) => {
  let findUser;
  let findSeller;

  try {
    findUser = await User.findOne({
      where: { id: req.body.id },
    });
  } catch (error) {
    return res.status(401).send("error");
  }

  try {
    findSeller = await Seller.findOne({
      where: { id: req.body.id },
    });
  } catch (error) {
    return res.status(401).send("error");
  }

  if (findUser === null && findSeller === null)
    return res.status(200).send("ok");
  else return res.status(200).send("no");
});

module.exports = router;
