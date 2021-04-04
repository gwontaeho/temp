const express = require("express");
const router = express();

const signup = require("./signup");
const login = require("./login");
const user = require("./user");
const changetype = require("./changetype");

router.use("/signup", signup);
router.use("/login", login);
router.use("/user", user);
router.use("/changetype", changetype);

module.exports = router;
