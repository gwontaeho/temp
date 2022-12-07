const express = require("express");
const router = express();

const user = require("./User");
const request = require("./Request");

router.use("/user", user);
router.use("/request", request);

module.exports = router;
