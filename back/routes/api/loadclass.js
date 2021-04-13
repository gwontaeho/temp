const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middlewares/jwt");

const Class = require("../../models").Class;

router.post("/", verifyToken, async (req, res, next) => {
  let result = [];
  try {
    const findAllClass = await Class.findAll({
      where: { sellerSeller: req.decoded.user },
    });
    findAllClass.forEach((v) => {
      result.push(v.dataValues);
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
