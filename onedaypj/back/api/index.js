const express = require("express");
const router = express();

const auth = require("./auth");
const product = require("./product");
const reservation = require("./reservation");
const schedule = require("./schedule");
const review = require("./review");
const qna = require("./qna");

router.use("/auth", auth);
router.use("/product", product);
router.use("/reservation", reservation);
router.use("/schedule", schedule);
router.use("/review", review);
router.use("/qna", qna);

module.exports = router;
