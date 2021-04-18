const express = require("express");
const router = express();

const signup = require("./signup");
const login = require("./login");
const user = require("./user");
const createclass = require("./createclass");
const loadclass = require("./loadclass");
const classinfo = require("./classinfo");
const addschedule = require("./addschedule");
const loadschedule = require("./loadschedule");

router.use("/signup", signup);
router.use("/login", login);
router.use("/user", user);
router.use("/createclass", createclass);
router.use("/loadclass", loadclass);
router.use("/classinfo", classinfo);
router.use("/addschedule", addschedule);
router.use("/loadschedule", loadschedule);

module.exports = router;
