const express = require("express");
const router = express();
const { Expert, User } = require("../models");
const { authorization } = require("../middlewares/jwt");

/**
 * 전문가 조회
 */
router.get("/", authorization, async (req, res, next) => {
    const { id } = req.verified;
    try {
        const expert = await Expert.findOne({ attributes: ["nickname", "contact", "introduction", "tags"], where: { UserId: id }, raw: true });
        return res.send(expert);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

/**
 * 전문가 등록, 수정
 */
router.post("/", authorization, async (req, res, next) => {
    const { id } = req.verified;
    const { nickname, contact, introduction, tags } = req.body;
    try {
        const [instance, created] = await Expert.upsert({ UserId: id, nickname, contact, introduction, tags });
        if (created) User.update({ isExpert: true }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = router;
