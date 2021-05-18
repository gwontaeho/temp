const express = require("express");
const router = express();

const signup = require("./signup");
const login = require("./login");
const auth = require("./auth");
const classes = require("./classes");
const schedule = require("./schedule");
const category = require("./category");
const product = require("./product");

router.use("/signup", signup);
router.use("/login", login);
router.use("/auth", auth);
router.use("/classes", classes);
router.use("/schedule", schedule);
router.use("/category", category);
router.use("/product", product);

module.exports = router;
