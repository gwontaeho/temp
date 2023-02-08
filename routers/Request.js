const express = require("express");
const router = express();
const { Op } = require("sequelize");
const { sequelize, Request, User, Review, Blacklist, Cancellation, Company } = require("../models");
const { verifyToken } = require("../middlewares/jwt");
const dayjs = require("dayjs");
const admin = require("firebase-admin");

// 업체 : 모든 요청 조회
router.get("/", verifyToken, async (req, res, next) => {
    const UserId = req.decoded?.id;
    const { TargetId, latitude, longitude, sort, time, type } = req.query;

    const typeOption = () => {
        if (type === "all") return [true, false];
        if (type === "user") return false;
        if (type === "share") return true;
    };

    const timeOption = () => {
        if (time === "0") return { [Op.gt]: time };
        return time;
    };

    const sortOption = {
        distance: ["distance", "ASC"],
        price: ["price", "DESC"],
        createdAt: ["createdAt", "DESC"],
    };

    const distance = sequelize.fn(
        "ST_Distance_Sphere",
        sequelize.fn("POINT", sequelize.col("longitude"), sequelize.col("latitude")),
        sequelize.fn("POINT", longitude, latitude)
    );

    try {
        const company = await Company.findOne({ where: { UserId: TargetId } });
        const { blocked_t, expiration } = company;
        const exp = dayjs(expiration);
        const bkd = dayjs(blocked_t);

        if (!exp.isValid() || exp < dayjs(dayjs().format("YYYYMMDD"))) {
            // 기간 만료
            return res.send({ code: 100 });
        }

        if (bkd.isValid() && bkd > dayjs()) {
            // 정지
            return res.send({ code: 110, blocked_t });
        }

        const blacklists = await Blacklist.findAll({ where: { TargetId: TargetId } });
        const blacklistsIds = blacklists.map((v) => v.UserId);

        const requests = await Request.findAll({
            attributes: {
                include: [[distance, "distance"]],
            },
            where: [
                sequelize.where(distance, "<=", req.query.distance),
                {
                    status: 1,
                    UserId: { [Op.not]: UserId, [Op.notIn]: blacklistsIds },
                    time: timeOption(),
                    share: typeOption(),
                },
            ],
            order: [sortOption[sort]],
        });

        const count = await Request.count({ where: { TargetId, status: [2, 3] } });

        return res.send({ requests, count, date: new Date() });
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
            order: [["createdAt", "DESC"]],
        });

        const count = await Request.count({ where: { UserId, share: true, status: [1, 2, 3] } });

        return res.send({ requests, count });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 업체 : 삭제 목록 조회
router.get("/targets/:TargetId/deleted", async (req, res, next) => {
    const { TargetId } = req.params;
    try {
        const requests = await Request.findAll({
            where: { TargetId, deleted_1: true, deleted_2: false },
            include: [{ model: User }],
            order: [["createdAt", "DESC"]],
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
            where: { TargetId, status: { [Op.not]: [0, 1] }, deleted_1: false },
            include: [{ model: User }],
            order: [["createdAt", "DESC"]],
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

        const TargetId = request?.TargetId;
        if (!!TargetId) {
            const count = await Request.count({ where: { UserId, TargetId, status: 5 } });
            return res.send({ ...request.dataValues, count });
        }

        return res.send(request);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 업체 : 특정 요청 조회
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const request = await Request.findByPk(id, { include: [{ model: User, as: "Target" }] });
        const UserId = request?.UserId;
        const TargetId = request?.TargetId;
        if (!!TargetId) {
            const count = await Request.count({ where: { UserId, TargetId, status: 5 } });
            return res.send({ ...request.dataValues, count });
        }
        return res.send(request);
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
        const request = await Request.findByPk(id);
        const TargetId = request.TargetId;
        const user = await User.findByPk(TargetId);
        const token = user.fcm_token;

        await Request.update({ status: 0 }, { where: { id } });

        res.sendStatus(200);

        if (token) {
            const message = {
                notification: { title: "사용자가 요청을 취소했습니다", body: "요청 확인하기" },
                token,
            };
            await admin.messaging().send(message);
        }

        return;
    } catch (error) {
        console.log(error);
    }
});

// 유저 : 요청 거절
router.put("/:id/users/reject", async (req, res, next) => {
    const { id } = req.params;
    try {
        const request = await Request.findByPk(id);
        const TargetId = request.TargetId;
        const user = await User.findByPk(TargetId);
        const token = user.fcm_token;

        await Request.update({ status: 1, TargetId: null, description_company: null, distance: null }, { where: { id } });

        res.sendStatus(200);

        if (token) {
            const message = {
                notification: { title: "사용자가 요청을 거절했습니다", body: "요청 확인하기" },
                token,
            };
            await admin.messaging().send(message);
        }

        return;
    } catch (error) {
        console.log(error);
    }
});

// 유저 : 요청 수락
router.put("/:id/users/accept", async (req, res, next) => {
    const { id } = req.params;
    try {
        await Request.update({ status: 3 }, { where: { id, status: 2 } });

        res.sendStatus(200);

        const request = await Request.findByPk(id);
        const TargetId = request.TargetId;
        const user = await User.findByPk(TargetId);
        const token = user.fcm_token;

        if (token) {
            const message = {
                notification: { title: "사용자가 요청을 수락했습니다", body: "요청 확인하기" },
                token,
            };
            await admin.messaging().send(message);
        }

        return;
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
    const { TargetId, description_company, distance } = req.body;
    try {
        const result = await Request.update({ status: 2, TargetId, description_company, distance }, { where: { id, status: 1 } });

        res.send({ code: result[0] });

        const request = await Request.findByPk(id);
        const UserId = request.UserId;
        const user = await User.findByPk(UserId);
        const token = user.fcm_token;

        if (token) {
            const message = {
                notification: { title: "업체가 요청을 수락했습니다", body: "요청 확인하기" },
                token,
            };
            await admin.messaging().send(message);
        }

        // result[0] === 1 : 성공
        // result[0] === 0 : 실패

        return;
    } catch (error) {
        console.log(error);
    }
});

// 업체 : 요청 취소
router.put("/:id/targets/cancel", verifyToken, async (req, res, next) => {
    const UserId = req.decoded.id;
    const { id } = req.params;
    try {
        await Request.update({ status: 1, description_company: null }, { where: { id } });
        await Cancellation.create({ UserId });
        const count = await Cancellation.count({ where: { UserId } });
        let blocked_t;
        if (count === 1) blocked_t = dayjs().add(10, "m");
        if (count === 2) blocked_t = dayjs().add(1, "h");
        if (count > 2) blocked_t = dayjs().add(1, "d");
        await Company.update({ blocked_t: blocked_t.toDate() }, { where: { UserId } });

        res.sendStatus(200);

        const request = await Request.findByPk(id);
        const requestUserId = request.UserId;
        const user = await User.findByPk(requestUserId);
        const token = user.fcm_token;

        if (token) {
            const message = {
                notification: { title: "업체가 요청을 취소했습니다", body: "요청 확인하기" },
                token,
            };
            await admin.messaging().send(message);
        }

        return;
    } catch (error) {
        console.log(error);
    }
});

// 업체 : 요청 완료
router.put("/:id/targets/complete", async (req, res, next) => {
    const { id } = req.params;
    try {
        await Request.update({ status: 4, completedAt: new Date() }, { where: { id, status: 3 } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 업체 : 기록 삭제 (임시)
router.put("/delete1", async (req, res, next) => {
    const { ids } = req.body;

    try {
        await Request.update({ deleted_1: true }, { where: { id: { [Op.in]: ids } } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

// 업체 : 기록 삭제
router.put("/delete2", async (req, res, next) => {
    const { ids } = req.body;

    try {
        await Request.update({ deleted_2: true }, { where: { id: { [Op.in]: ids } } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
