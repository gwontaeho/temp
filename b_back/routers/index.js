const express = require("express");
const router = express();

const user = require("./User");
const expert = require("./Expert");
const project = require("./Project");
const tag = require("./Tag");
const application = require("./Application");
const notification = require("./Notification");

router.use("/users", user);
router.use("/experts", expert);
router.use("/projects", project);
router.use("/tags", tag);
router.use("/applications", application);
router.use("/notifications", notification);

module.exports = router;
