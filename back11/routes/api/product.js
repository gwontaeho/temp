const express = require("express");
const router = express.Router();

const Class = require("../../models").Class;

router.post("/", async (req, res, next) => {
  try {
    const result = await Class.findOne({
      where: { id: req.body.id },
    });
    console.log(result.dataValues);
    return res.status(200).json(result.dataValues);
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
