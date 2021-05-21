const express = require("express");
const router = express.Router();

const Class = require("../../models").Class;

router.post("/", async (req, res, next) => {
  let result = [];
  try {
    const findAllClass = await Class.findAll({});
    findAllClass.forEach((v) => {
      result.push(v.dataValues);
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
