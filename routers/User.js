const express = require("express");
const router = express();

const { User } = require("../models");
const { signToken } = require("../middlewares/jwt");

router.get("/", async (req, res, next) => {
    console.log("asd");
    try {
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

router.post("/oauth", async (req, res, next) => {
    const { email } = req.body;
    try {
        /* 사용자 조회, 생성 */
        const [user] = await User.findOrCreate({ where: { email }, defaults: { email, type: "kakao", role: "user" } });
        /* 회원가입, 로그인 성공 */
        const token = signToken(user.id);
        return res.send({ token, role: user.role });
    } catch (error) {
        console.log(error);
    }
});

router.post("/signup", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        /* 사용자 조회, 생성 */
        const [, created] = await User.findOrCreate({ where: { email }, defaults: { email, password, type: "credentials", role: "user" } });
        /* 회원가입 성공 */
        if (created) return res.sendStatus(200);
        /* 회원가입 실패 (이메일 중복) */
        return res.sendStatus(400);
    } catch (error) {
        console.log(error);
    }
});

router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        /* 사용자 조회 */
        const user = await User.findOne({ where: { email } });
        /* 로그인 실패 (없는 사용자) */
        if (!user) return res.sendStatus(400);
        /* 로그인 실패 (비밀번호 불일치) */
        if (user.password !== password) return res.sendStatus(400);
        /* 로그인 성공 */
        const token = signToken(user.id);
        return res.send({ token, role: user.role });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
