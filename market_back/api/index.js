const express = require("express");
const router = express();

const user = require("./user");
const product = require("./product");
const wish = require("./wish");
const comment = require("./comment");

router.use("/user", user);
router.use("/product", product);
router.use("/wish", wish);
router.use("/comment", comment);

module.exports = router;
