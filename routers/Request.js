const express = require("express");
const router = express();
const { Op } = require("sequelize");
const { sequelize, Request, User, Review, Blacklist } = require("../models");
const { verifyToken } = require("../middlewares/jwt");

// 업체 : 모든 요청 조회
router.get("/", async (req, res, next) => {
    const { latitude, longitude } = req.query;

    const distance = sequelize.fn(
        "ST_Distance_Sphere",
        sequelize.fn("POINT", sequelize.col("longitude"), sequelize.col("latitude")),
        sequelize.fn("POINT", longitude, latitude)
    );

    try {
        const requests = await Request.findAll({
            attributes: {
                include: [[distance, "distance"]],
            },
            where: [sequelize.where(distance, "<=", req.query.distance), { status: 1 }],
        });

        return res.send(requests);
    } catch (error) {
        console.log(error);
    }
});

// 업체 : 공유목록 조회
router.get("/users/:UserId/shares", async (req, res, next) => {
    const { UserId } = req.params;
    try {
        const requests = await Request.findAll({
            where: { UserId, share: true, status: { [Op.not]: 0 } },
        });
        return res.send(requests);
    } catch (error) {
        console.log(error);
    }
});

// 업체 : 매칭된 모든 요청 조회
router.get("/targets/:TargetId", async (req, res, next) => {
    const { TargetId } = req.params;
    try {
        const requests = await Request.findAll({
            where: { TargetId },
            include: [{ model: User }],
        });
        return res.send(requests);
    } catch (error) {
        console.log(error);
    }
});

// 유저 : 가장 최근 요청 조회
router.get("/users/:UserId/last", async (req, res, next) => {
    const { UserId } = req.params;
    if (!UserId) return res.sendStatus(400);
    try {
        const request = await Request.findOne({
            include: [{ model: User, as: "Target" }],
            where: { UserId },
            order: [["createdAt", "DESC"]],
        });

        return res.send(request);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 업체 : 특정 요청 조회
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const requests = await Request.findByPk(id);
        return res.send(requests);
    } catch (error) {
        console.log(error);
    }
});

// 유저, 업체 : 요청 생성
router.post("/", async (req, res, next) => {
    try {
        await Request.create(req.body);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 유저 : 요청 취소
router.put("/:id/users/cancel", async (req, res, next) => {
    const { id } = req.params;
    try {
        await Request.update({ status: 0 }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 유저 : 요청 거절
router.put("/:id/users/reject", async (req, res, next) => {
    const { id } = req.params;
    try {
        await Request.update({ status: 1, TargetId: null, description_company: null }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 업체 : 요청 수락
router.put("/:id/users/accept", async (req, res, next) => {
    const { id } = req.params;
    try {
        await Request.update({ status: 3 }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 유저 : 요청 완료
router.put("/:id/users/complete", async (req, res, next) => {
    const { id } = req.params;
    const { UserId, TargetId, content, block } = req.body;

    try {
        await Request.update({ status: 5 }, { where: { id } });
        await Review.create({ UserId, TargetId, RequestId: id, content });
        if (block) await Blacklist.create({ UserId, TargetId });

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 업체 : 요청 수락
router.put("/:id/targets/accept", async (req, res, next) => {
    const { id } = req.params;
    const { TargetId, description_company } = req.body;
    try {
        await Request.update({ status: 2, TargetId, description_company }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 업체 : 요청 취소
router.put("/:id/targets/cancel", async (req, res, next) => {
    const { id } = req.params;
    try {
        await Request.update({ status: 1, TargetId: null, description_company: null }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 업체 : 요청 완료
router.put("/:id/targets/complete", async (req, res, next) => {
    const { id } = req.params;
    try {
        await Request.update({ status: 4 }, { where: { id } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
