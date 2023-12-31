const express = require("express");
const router = express();
const { User, Company, Admin } = require("../models");
const { signToken } = require("../middlewares/jwt");

// 유저 조회
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, { include: [{ model: Company }] });
        const token = signToken(user.id);
        res.send({ user, token, date: new Date() });
        await User.update({ last_login: new Date() }, { where: { id: user.id } });
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
});

// 회원가입, 로그인
router.post("/sign", async (req, res, next) => {
    const { phone, device, fcm_token } = req.body;
    try {
        const [user, created] = await User.findOrCreate({ where: { phone }, defaults: { phone, device, fcm_token, role: 1 }, include: [{ model: Company }] });

        const mode = await Admin.findOne({ where: { type: "test" } });

        if (!mode.status && phone.startsWith("9999")) {
            // 테스트모드가 아니고 테스트계정으로 로그인 시도 시
            return res.sendStatus(401);
        }

        // 테스트 계정이 아니고, 업체 회원이고, device가 있지만 다를 시 (다른 기기에서 로그인 시)
        if (!phone.startsWith("9999") && user.role === 2 && !!user.device && user.device !== device) return res.sendStatus(400);

        if (!created) {
            // device 없으면 업데이트
            if (!user.device) await User.update({ device }, { where: { id: user.id } });
            // fcm 토큰 다르면 업데이트
            if (!!fcm_token && user.fcm_token !== fcm_token) await User.update({ fcm_token }, { where: { id: user.id } });
        }

        const token = signToken(user.id);
        res.send({ user, token, date: new Date() });
        await User.update({ last_login: new Date() }, { where: { id: user.id } });
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

        const mode = await Admin.findOne({ where: { type: "test" } });

        if (!mode.status && phone.startsWith("9999")) {
            // 테스트모드가 아니고 테스트계정으로 로그인 시도 시
            return res.sendStatus(401);
        }

        // 테스트 계정이 아니고 device가 있지만 다를 시 (다른 기기에서 로그인 시)
        if (!phone.startsWith("9999") && !!user.device && user.device !== device) return res.sendStatus(400);

        await User.update({ last_login: new Date() }, { where: { id: user.id } });

        const token = signToken(user.id);

        // 이미 계정이 업체면 로그인
        if (user.role === 2) return res.send({ user, token, date: new Date() });

        // 이미 있는 계정이면 업체문의로 업데이트
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
    const { marketing } = req.body;
    try {
        await User.update({ terms: true, marketing }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        return res.send(500);
    }
});

// 마케팅 동의
router.put("/:id/marketing", async (req, res, next) => {
    const { id } = req.params;
    const { marketing } = req.body;
    try {
        await User.update({ marketing }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
});

module.exports = router;
