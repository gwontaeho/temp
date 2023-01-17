const express = require("express");
const router = express();
const { User, Company } = require("../models");
const { signToken } = require("../middlewares/jwt");

// 회원가입, 로그인
router.post("/sign", async (req, res, next) => {
    const { phone, device } = req.body;
    try {
        const [user, created] = await User.findOrCreate({ where: { phone }, defaults: { phone, device, role: 1 }, include: [{ model: Company }] });
        // device가 다를 시 (다른 기기에서 로그인 시)
        if (user.device !== device) return res.send(400);
        const token = signToken(user.id);
        return res.send({ user, token });
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
});

// 업체등록 문의
router.post("/inquiry", async (req, res, next) => {
    const { phone, device } = req.body;
    try {
        const [user, created] = await User.findOrCreate({ where: { phone }, defaults: { phone, device, role: 1, status: 2 }, include: [{ model: Company }] });
        const token = signToken(user.id);
        // device가 다를 시 (다른 기기에서 로그인 시)
        if (user.device !== device) return res.send(400);
        if (user.role === 2) return res.send({ user, token });
        if (!created) await User.update({ status: 2 }, { where: { phone } });
        return res.send({ user: { ...user.dataValues, status: 2 }, token });
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
});

module.exports = router;
