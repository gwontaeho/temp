const express = require("express");
const router = express();

const user = require("./User");
const request = require("./Request");
const price = require("./Price");
const admin = require("./Admin");

router.use("/users", user);
router.use("/requests", request);
router.use("/prices", price);
router.use("/admin", admin);

module.exports = router;
