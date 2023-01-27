const express = require("express");
const router = express();
const { User, Company } = require("../models");
const { verifyToken } = require("../middlewares/jwt");

// 대시보드
router.get("/dashboard", async (req, res, next) => {
    try {
        const inquiryCount = await User.count({
            where: { status: 2 },
        });
        const userCount = await User.count({
            where: { role: 1 },
        });
        const companyCount = await User.count({
            where: { role: 2 },
        });
        const data = { inquiryCount, userCount, companyCount };
        return res.send(data);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 관리자 : 전체 업체 조회
router.get("/companies", async (req, res, next) => {
    try {
        const companies = await User.findAll({
            where: { role: 2 },
            include: [{ model: Company }],
        });
        return res.send(companies);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 관리자 : 전체 사용자 조회
router.get("/users", async (req, res, next) => {
    try {
        const users = await User.findAll({ where: { role: 1 } });
        return res.send(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 업체문의 조회
router.get("/inquiries", async (req, res, next) => {
    try {
        const inquiries = await User.findAll({
            where: { status: 2 },
        });
        return res.send(inquiries);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 업체등록 승인
router.put("/inquiry-accept", async (req, res, next) => {
    const { id, company_name } = req.body;
    try {
        await User.update({ status: 1, role: 2 }, { where: { id } });
        await Company.create({ UserId: id, name: company_name });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 업체등록 거절
router.put("/inquiry-reject", async (req, res, next) => {
    const { id } = req.body;
    try {
        await User.update({ status: 1 }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 계정 비활성화
router.put("/user-block", async (req, res, next) => {
    const { id } = req.body;
    try {
        await User.update({ status: 0 }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 계정 활성화
router.put("/user-restore", async (req, res, next) => {
    const { id } = req.body;
    try {
        await User.update({ status: 1 }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 만료일 설정
router.put("/company-expiration", async (req, res, next) => {
    const { id, expiration } = req.body;
    try {
        await Company.update({ expiration }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = router;
