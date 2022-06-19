const express = require("express");
const router = express();

const { user } = require("../models");
const { signToken } = require("../middlewares/jwt");

router.get("/", async (req, res, next) => {
  console.log("asd");
  try {
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  const { phone, fb_phone, fb_uid } = req.body;
  try {
    const findOrCreateUser = await user.findOrCreate({
      where: { phone: "010050500" },
      defaults: { fb_phone, fb_uid },
    });
    const token = signToken(findOrCreateUser[0].id);
    return res.send(token);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
