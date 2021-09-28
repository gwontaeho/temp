const express = require("express");
const router = express();

const signup = require("./signup");
const login = require("./login");
const auth = require("./auth");
const classes = require("./classes");
const schedule = require("./schedule");
const category = require("./category");
const product = require("./product");
const reservation = require("./reservation");
const review = require("./review");
const qna = require("./qna");

router.use("/signup", signup);
router.use("/login", login);
router.use("/auth", auth);
router.use("/classes", classes);
router.use("/schedule", schedule);
router.use("/category", category);
router.use("/product", product);
router.use("/reservation", reservation);
router.use("/review", review);
router.use("/qna", qna);

module.exports = router;
