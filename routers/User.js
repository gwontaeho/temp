const express = require("express");
const router = express();
const { literal } = require("sequelize");
const { User } = require("../models");
const { signToken, verifyToken, authorization } = require("../middlewares/jwt");
const { forSignup } = require("../middlewares/mailer");

/**
 * 회원가입, 비밀번호 재설정 메일 전송
 */
router.post("/email", async (req, res, next) => {
    const { email } = req.body;
    const token = signToken({ email }, { expiresIn: 180 });
    const status = await forSignup(email, token);
    return res.sendStatus(status);
});

/**
 * 회원가입, 비밀번호 재설정
 */
router.post("/signup", async (req, res, next) => {
    const { token, password } = req.body;
    const verified = verifyToken(token);
    if (!verified) return res.sendStatus(400);
    const { email } = verified;
    try {
        await User.upsert({ email, password });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

/**
 * 로그인
 */
router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email }, raw: true });
        if (!user) return res.status(400).send({ code: 1000 });
        if (password !== user.password) return res.status(400).send({ code: 1001 });
        const token = signToken({ id: user.id });
        return res.cookie("token", token).sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

/**
 * 사용자 조회
 */
router.get("/", authorization, async (req, res, next) => {
    const { id } = req.verified;
    try {
        const user = await User.findByPk(id, { attributes: ["email", "isExpert", "hasNewNotification", "isAllowedNotification"], raw: true });
        if (!user) return res.sendStatus(400);
        const { isExpert, hasNewNotification, isAllowedNotification } = user;
        user.isExpert = !!isExpert;
        user.hasNewNotification = !!hasNewNotification;
        user.isAllowedNotification = !!isAllowedNotification;
        return res.send(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

/**
 * 이메일 알림 on, off
 */
router.put("/toggle-notification", authorization, async (req, res, next) => {
    const { id } = req.verified;
    try {
        await User.update({ isAllowedNotification: literal("NOT isAllowedNotification") }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// router.get("/sign/kakao", async (req, res, next) => {
//     const { code } = req.query;
//     try {
//         const {
//             data: { access_token },
//         } = await axios.post(
//             "https://kauth.kakao.com/oauth/token",
//             { grant_type: "authorization_code", client_id: process.env.KAKAO_REST_API_KEY, code },
//             { headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" } }
//         );
//         const {
//             data: {
//                 kakao_account: { email },
//             },
//         } = await axios.post(
//             "https://kapi.kakao.com/v2/user/me",
//             {},
//             { headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", Authorization: `Bearer ${access_token}` } }
//         );
//         const [{ id }, created] = await User.findOrCreate({ where: { email_kakao: email }, defaults: { email } });
//         console.log(created);
//         const token = signToken(id);
//         return res.cookie("token", token).redirect("http://localhost:3000");
//     } catch (error) {
//         console.log(error);
//         return res.sendStatus(500);
//     }
// });

module.exports = router;
