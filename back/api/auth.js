const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const { verifyToken, signToken } = require("../jwt");
const User = require("../models").User;
const Seller = require("../models").Seller;

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(
        null,
        `public/img/${req.headers.signuptype === "1" ? "user" : "seller"}/`
      );
    },
    filename(req, file, done) {
      done(
        null,
        req.headers.signupid +
          "_" +
          String(new Date().getTime()) +
          path.extname(file.originalname)
      );
    },
  }),
});

router.post("/type", verifyToken, (req, res, next) => {
  /////////////////////////////////////////////////////
  const response = req.decoded.type;
  return res.status(200).json(response);
});

router.post("/user", verifyToken, async (req, res, next) => {
  ///////////////////////////////////////////////////////////////
  try {
    const findUser = await User.findOne({
      where: { id: req.decoded.id },
      attributes: { exclude: ["password"] },
    });
    return res.status(200).send(findUser.dataValues);
  } catch (error) {
    return res.status(500).send();
  }
});

router.post("/seller", verifyToken, async (req, res, next) => {
  ////////////////////////////////////////////////////////////////
  try {
    const findSeller = await Seller.findOne({
      where: { id: req.decoded.id },
      attributes: { exclude: ["password"] },
    });
    return res.status(200).send(findSeller.dataValues);
  } catch (error) {
    return res.status(500).send();
  }
});

router.post("/user/update", verifyToken, async (req, res, next) => {
  ///////////////////////////////////////////////////////////////////////
  try {
    await User.update(
      { phone: req.body.phone },
      { where: { id: req.decoded.id } }
    );
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
});

router.post("/seller/update", verifyToken, async (req, res, next) => {
  //////////////////////////////////////////////////////////////////////////
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
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
});

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  //////////////////////////////////////////////////////////////////
  if (req.body.type === 1) {
    try {
      const findUser = await User.findOne({
        where: { id: req.body.id },
        attributes: ["id", "password"],
      });
      if (findUser === null) return res.status(400).send();
      if (findUser.dataValues.password !== req.body.password) {
        return res.status(400).send();
      }
      return res.status(200).send(signToken(req.body.id, req.body.type));
    } catch (error) {
      return res.status(500).send();
    }
  } else if (req.body.type === 2) {
    try {
      const findSeller = await Seller.findOne({
        where: { id: req.body.id },
        attributes: ["id", "password"],
      });
      if (findSeller === null) return res.state(400).send();
      if (findSeller.dataValues.password !== req.body.password) {
        return res.status(400).send();
      }
      return res.status(200).send(signToken(req.body.id, req.body.type));
    } catch (error) {
      return res.status(500).send();
    }
  }
});

router.post("/user/create", upload.single("img"), async (req, res, next) => {
  //////////////////////////////////////////////////////////////////
  try {
    await User.create({
      id: req.body.id,
      password: req.body.password,
      name: req.body.name,
      birth: req.body.birth,
      gender: req.body.gender,
      phone: req.body.phone,
      img: req.file === undefined ? null : req.file.path,
    });
    return res.status(200).send();
  } catch (error) {
    fs.unlink(req.file.path, (error) => {
      if (error) console.log(error);
    });
    return res.status(500).send();
  }
});

router.post("/seller/create", upload.single("img"), async (req, res, next) => {
  ////////////////////////////////////////////////////////////////////
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
      img: req.file === undefined ? null : req.file.path,
    });
    return res.status(200).send();
  } catch (error) {
    fs.unlink(req.file.path, (error) => {
      if (error) console.log(error);
    });
    return res.status(500).send();
  }
});

router.post("/overlap", async (req, res, next) => {
  ////////////////////////////////////////////////////////////////////
  let findUser;
  let findSeller;
  try {
    findUser = await User.findOne({
      where: { id: req.body.id },
    });
  } catch (error) {
    return res.status(500).send();
  }
  try {
    findSeller = await Seller.findOne({
      where: { id: req.body.id },
    });
  } catch (error) {
    return res.status(500).send();
  }
  if (findUser === null && findSeller === null) return res.status(200).send();
  else return res.status(400).send();
});

module.exports = router;
