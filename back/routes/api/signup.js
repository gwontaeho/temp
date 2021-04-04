const express = require("express");
const router = express.Router();

const User = require("../../models").User;

router.post("/", async (req, res, next) => {
  try {
    await User.create({
      user: req.body.user,
      password: req.body.password,
      name: req.body.name,
      birth: req.body.birth,
      gender: req.body.gender,
      phone: req.body.phone,
      type: 1,
    });
    res.status(200).send("abc");
  } catch (error) {
    console.log(error);
    res.status(500).send("nono");
  }
});

module.exports = router;
