const express = require("express");
const router = express();
const { User, Company, Admin, Request } = require("../models");
const { verifyToken, signToken } = require("../middlewares/jwt");

// 관리자 로그인
router.post("/sign", async (req, res, next) => {
    const { phone, device } = req.body;

    try {
        const user = await User.findOne({ where: { phone } });
        console.log(user.device === device);
        if (user === null || user.device !== device) return res.sendStatus(400);
        const token = signToken(user.id);
        return res.send({ token });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 관리자 비밀번호 변경
router.put("/password", verifyToken, async (req, res, next) => {
    const id = req.decoded?.id;
    const { device, password } = req.body;

    try {
        const users = await User.findOne({ where: { id } });
        if (users.device !== device) return res.sendStatus(400);
        await User.update({ device: password }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 업체 생성
router.post("/company", verifyToken, async (req, res, next) => {
    const { phone, name } = req.body;

    try {
        const [user, created] = await User.findOrCreate({ where: { phone }, defaults: { phone, company_name: name, role: 2 } });
        if (!created) return res.send({ code: 1 });
        if (created) await Company.create({ UserId: user.id, name });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

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

// 대시보드
router.get("/requests", async (req, res, next) => {
    try {
        const requests = await Request.findAll({
            attributes: ["id", "phone", "createdAt", "share", "status", "address", "address_detail", "category", "price", "personnel"],
            include: {
                model: User,
                attributes: ["phone"],
            },
        });
        return res.send(requests);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 대시보드
router.get("/settings", async (req, res, next) => {
    try {
        const settings = await Admin.findAll();
        return res.send(settings);
    } catch (error) {
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
router.put("/inquiry-accept", verifyToken, async (req, res, next) => {
    const { id, company_name } = req.body;
    try {
        await User.update({ status: 1, role: 2 }, { where: { id } });
        await Company.create({ UserId: id, name: company_name });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 전체 업체등록 승인
router.put("/inquiry-accept-all", verifyToken, async (req, res, next) => {
    try {
        const users = await User.findAll({ where: { status: 2, role: 1 } });
        if (users.length > 0) {
            const map = users.map((v) => ({ UserId: v.id, name: v.company_name }));
            const ids = map.map((v) => v.UserId);
            await User.update({ status: 1, role: 2 }, { where: { id: ids } });
            await Company.bulkCreate(map);
        }
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 업체등록 거절
router.put("/inquiry-reject", verifyToken, async (req, res, next) => {
    const { id } = req.body;
    try {
        await User.update({ status: 1, company_name: null }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 전체 업체등록 거절
router.put("/inquiry-reject-all", verifyToken, async (req, res, next) => {
    try {
        const users = await User.findAll({ where: { status: 2, role: 1 } });
        const ids = users.map((v) => v.id);
        console.log(ids);
        await User.update({ status: 1, company_name: null }, { where: { id: ids } });

        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 계정 비활성화
router.put("/user-block", verifyToken, async (req, res, next) => {
    const { id } = req.body;
    try {
        await User.update({ status: 0 }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 계정 활성화
router.put("/user-restore", verifyToken, async (req, res, next) => {
    const { id } = req.body;
    try {
        await User.update({ status: 1 }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 만료일 설정
router.put("/company-expiration", verifyToken, async (req, res, next) => {
    const { id, expiration } = req.body;
    try {
        await Company.update({ expiration }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 카운트 설정
router.put("/company-count", verifyToken, async (req, res, next) => {
    const { id, max_count } = req.body;
    try {
        await Company.update({ max_count }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 거리 설정
router.put("/company-distance", verifyToken, async (req, res, next) => {
    const { id, distance } = req.body;
    try {
        await Company.update({ distance }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 카운트 설정
router.put("/company-name", verifyToken, async (req, res, next) => {
    const { id, UserId, name } = req.body;
    try {
        await User.update({ company_name: name }, { where: { id: UserId } });
        await Company.update({ name }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// device 삭제
router.put("/company-device", verifyToken, async (req, res, next) => {
    const { id } = req.body;
    try {
        await User.update({ device: null, fcm_token: null }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// device 삭제
router.put("/settings", verifyToken, async (req, res, next) => {
    const { type, status } = req.body;
    try {
        await Admin.update({ status }, { where: { type } });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

module.exports = router;
