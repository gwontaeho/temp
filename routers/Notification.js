const express = require("express");
const router = express();
const { authorization } = require("../middlewares/jwt");
const { Notification, User } = require("../models");

// 사용자 알림 조회
router.get("/", authorization, async (req, res, next) => {
    const UserId = req.verified.id;
    try {
        const ns = await Notification.findAll({ where: { UserId }, order: [["createdAt", "DESC"]], raw: true });
        await User.update({ hasNewNotification: false }, { where: { id: UserId } });
        return res.send(ns);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = router;
