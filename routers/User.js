const express = require("express");
const router = express();
const { User, Company } = require("../models");
const { signToken } = require("../middlewares/jwt");

// 유저 조회
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, { include: [{ model: Company }] });
        const token = signToken(user.id);
        return res.send({ user, token, date: new Date() });
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
});

// 회원가입, 로그인
router.post("/sign", async (req, res, next) => {
    console.log("login");
    const { phone, device, fcm_token } = req.body;
    try {
        const [user, created] = await User.findOrCreate({ where: { phone }, defaults: { phone, device, fcm_token, role: 1 }, include: [{ model: Company }] });
        // device가 다를 시 (다른 기기에서 로그인 시)
        if (!phone.startsWith("9999") && user.device !== device) return res.sendStatus(400);
        const token = signToken(user.id);
        return res.send({ user, token, date: new Date() });
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
});

// 업체등록 문의
router.post("/inquiry", async (req, res, next) => {
    const { phone, device, company_name, fcm_token } = req.body;

    try {
        const [user, created] = await User.findOrCreate({
            where: { phone },
            defaults: { phone, device, role: 1, status: 2, company_name, fcm_token },
            include: [{ model: Company }],
        });
        const token = signToken(user.id);
        // device가 다를 시 (다른 기기에서 로그인 시)
        if (!phone.startsWith("9999") && user.device !== device) return res.sendStatus(400);
        if (user.role === 2) return res.send({ user, token, date: new Date() });
        if (!created) await User.update({ status: 2, company_name }, { where: { phone } });
        return res.send({ user: { ...user.dataValues, status: 2 }, token, date: new Date() });
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
});

// 약관 동의
router.put("/:id/terms", async (req, res, next) => {
    const { id } = req.params;
    try {
        await User.update({ terms: true }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
});

module.exports = router;
