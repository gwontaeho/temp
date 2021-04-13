const express = require("express");
const router = express();

const signup = require("./signup");
const login = require("./login");
const user = require("./user");
const createclass = require("./createclass");
const loadclass = require("./loadclass");

router.use("/signup", signup);
router.use("/login", login);
router.use("/user", user);
router.use("/createclass", createclass);
router.use("/loadclass", loadclass);

module.exports = router;
