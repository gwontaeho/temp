const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");

router.post("/", verifyToken, (req, res, next) => {
  return res.status(200).json({ type: req.decoded.type });
});

module.exports = router;
