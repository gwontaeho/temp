const express = require("express");
const router = express();
const { Op } = require("sequelize");
const { sequelize, Request, User, Review, Blacklist, Cancellation, Company } = require("../models");
const { verifyToken } = require("../middlewares/jwt");
const dayjs = require("dayjs");
const admin = require("firebase-admin");

// 업체 : 모든 요청 조회
router.get("/", verifyToken, async (req, res, next) => {
    const UserId = req.decoded.id;
    const { latitude, longitude, sort, time, type } = req.query;

    const typeOption = () => {
        switch (type) {
            case "user":
                return false;
            case "share":
                return true;
            default:
                return [true, false];
        }
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
        const company = await Company.findOne({ where: { UserId }, attributes: ["blocked_t", "expiration"] });

        const { blocked_t, expiration } = company;
        const exp = dayjs(expiration);
        const bkd = dayjs(blocked_t);

        // 기간 만료
        if (!exp.isValid() || exp < dayjs(dayjs().format("YYYYMMDD"))) return res.send({ code: 100 });
        // 매칭 대기
        if (bkd.isValid() && bkd > dayjs()) {
            const cancellation = await Cancellation.findOne({ where: { UserId }, order: [["createdAt", "DESC"]], attributes: ["seq"] });
            return res.send({ code: 110, blocked_t, seq: cancellation.seq });
        }

        const bl1 = await Blacklist.findAll({ where: { TargetId: UserId }, attributes: ["UserId"] });
        const bl2 = await Blacklist.findAll({ where: { UserId }, attributes: ["TargetId"] });
        const blIds1 = bl1.map((v) => v.UserId);
        const blIds2 = bl2.map((v) => v.TargetId);

        const requests = await Request.findAll({
            attributes: { include: [[distance, "distance"]] },
            where: [
                sequelize.where(distance, "<=", req.query.distance),
                {
                    status: 1,
                    UserId: { [Op.not]: UserId, [Op.notIn]: [...blIds1, ...blIds2] },
                    time: timeOption(),
                    share: typeOption(),
                },
            ],
            order: [sortOption[sort]],
        });
        const count = await Request.count({ where: { TargetId: UserId, status: [2, 3] } });

        return res.send({ requests, count, date: new Date() });
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 업체 : 공유목록 조회
router.get("/users/:UserId/shares", async (req, res, next) => {
    const { UserId } = req.params;
    try {
        const requests = await Request.findAll({
            where: { UserId, share: true, isDeleted_3: false },
            order: [["createdAt", "DESC"]],
        });
        const count = await Request.count({ where: { UserId, share: true, status: [1, 2, 3] } });
        return res.send({ requests, count });
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 업체 : 삭제 목록 조회
router.get("/targets/:TargetId/deleted", async (req, res, next) => {
    const { TargetId } = req.params;
    const { share } = req.query;

    const isShared = share === "true";
    const where = isShared ? { isDeleted_3: true, isDeleted_4: false } : { isDeleted_1: true, isDeleted_2: false };
    const id = isShared ? { UserId: TargetId } : { TargetId };

    try {
        const requests = await Request.findAll({
            where: {
                ...id,
                ...where,
            },
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
            where: { TargetId, status: { [Op.not]: [0, 1] }, isDeleted_1: false },
            include: [{ model: User }],
            order: [
                ["status", "ASC"],
                ["completedAt", "DESC"],
                ["updatedAt", "DESC"],
            ],
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
router.post("/", verifyToken, async (req, res, next) => {
    const UserId = req.decoded.id;

    try {
        const request = await Request.findOne({
            include: [{ model: User }],
            where: { UserId },
            order: [["createdAt", "DESC"]],
        });
        const role = request.User.role;
        if (role === 1 && (request.status === 1 || request.status === 2 || request.status === 3 || request.status === 4)) return res.sendStatus(400);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    try {
        await Request.create(req.body);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 유저 : 요청 취소
router.put("/:id/users/cancel", verifyToken, async (req, res, next) => {
    const { id } = req.params;
    try {
        await Request.update({ status: 0 }, { where: { id, status: [1, 2, 3] } });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 유저 : 요청 거절
router.put("/:id/users/reject", verifyToken, async (req, res, next) => {
    const { id } = req.params;

    let result;

    try {
        result = await Request.update({ status: 1, TargetId: null, description_company: null, distance: null }, { where: { id, status: 2 } });
        res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }

    if (result[0] === 1) {
        try {
            const request = await Request.findByPk(id, { attributes: ["TargetId"] });
            const user = await User.findByPk(request.TargetId, { attributes: ["fcm_token"] });
            const token = user.fcm_token;
            if (token) {
                const message = {
                    notification: { title: "사용자가 요청을 거절했습니다", body: "요청 확인하기" },
                    token,
                };
                await admin.messaging().send(message);
            }
        } catch (error) {}
    }
});

// 유저 : 요청 수락
router.put("/:id/users/accept", verifyToken, async (req, res, next) => {
    const { id } = req.params;

    let result;

    try {
        result = await Request.update({ status: 3 }, { where: { id, status: 2 } });
        res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }

    try {
        if (result[0] === 1) {
            const request = await Request.findByPk(id, { attributes: ["TargetId"] });
            const user = await User.findByPk(request.TargetId, { attributes: ["fcm_token"] });
            const token = user.fcm_token;
            if (token) {
                const message = {
                    notification: { title: "사용자가 요청을 수락했습니다", body: "요청 확인하기" },
                    token,
                };
                await admin.messaging().send(message);
            }
        }
    } catch (error) {}
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
router.put("/:id/targets/accept", verifyToken, async (req, res, next) => {
    const TargetId = req.decoded.id;
    const { id } = req.params;
    const { description_company, distance } = req.body;

    let result;

    // 요청 업데이트 후 결과 res
    try {
        result = await Request.update({ status: 2, TargetId, description_company, distance }, { where: { id, status: 1 } });
        res.send({ code: result[0] });
    } catch (error) {
        return res.sendStatus(500);
    }

    // 수락 시 fcm
    if (result[0] === 1) {
        try {
            const request = await Request.findByPk(id, { attributes: ["UserId"] });
            const user = await User.findByPk(request.UserId, { attributes: ["fcm_token"] });
            const token = user.fcm_token;
            if (token) {
                const message = {
                    notification: { title: "업체가 요청을 수락했습니다", body: "요청 확인하기" },
                    token,
                };
                await admin.messaging().send(message);
            }
        } catch (error) {}
    }
});

// 업체 : 요청 취소
router.put("/:id/targets/cancel", verifyToken, async (req, res, next) => {
    const UserId = req.decoded.id;
    const { id } = req.params;

    let request;
    let result;

    try {
        request = await Request.findByPk(id, { attributes: ["UserId", "status"] });
        result = await Request.update({ status: 1, description_company: null, distance: null }, { where: { id, status: [2, 3] } });

        // 사용자가 수락한 이후 취소
        if (request?.status === 3) {
            let seq = 1;
            let blocked_t = dayjs().add(10, "m");
            const last = await Cancellation.findOne({ where: { UserId }, order: [["createdAt", "DESC"]] });
            if (!!last) {
                const diff = dayjs().diff(last.createdAt, "h");
                if (diff < 12) {
                    seq = last.seq + 1;
                    if (seq === 2) blocked_t = dayjs().add(1, "h");
                    if (seq >= 3) blocked_t = dayjs().add(1, "d");
                }
            }
            await Cancellation.create({ UserId, seq });
            await Company.update({ blocked_t: blocked_t.toDate() }, { where: { UserId } });
        }

        res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }

    // 업체 취소 시 fcm
    if (result[0] === 1) {
        try {
            const user = await User.findByPk(request.userId, { attributes: ["fcm_token"] });
            const token = user.fcm_token;
            if (token) {
                const message = {
                    notification: { title: "업체가 요청을 취소했습니다", body: "요청 확인하기" },
                    token,
                };
                await admin.messaging().send(message);
            }
        } catch (error) {}
    }
});

// 업체 : 요청 완료
router.put("/:id/targets/complete", verifyToken, async (req, res, next) => {
    const { id } = req.params;
    try {
        const request = await Request.findByPk(id);
        const { updatedAt, time } = request;
        const completed = dayjs(updatedAt).add(time, "m");
        if (completed > dayjs()) return res.sendStatus(400);
        await Request.update({ status: 4, completedAt: new Date() }, { where: { id, status: 3 } });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 업체 : 기록 삭제 (임시)
router.put("/delete1", async (req, res, next) => {
    const { ids } = req.body;
    try {
        await Request.update({ isDeleted_1: true }, { where: { id: { [Op.in]: ids } } });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 업체 : 기록 삭제
router.put("/delete2", async (req, res, next) => {
    const { ids } = req.body;
    try {
        await Request.update({ isDeleted_2: true }, { where: { id: { [Op.in]: ids } } });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 업체 : 공유 기록 삭제 (임시)
router.put("/delete3", async (req, res, next) => {
    const { ids } = req.body;
    try {
        await Request.update({ isDeleted_3: true }, { where: { id: { [Op.in]: ids } } });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// 업체 : 공유 기록 삭제
router.put("/delete4", async (req, res, next) => {
    const { ids } = req.body;
    try {
        await Request.update({ isDeleted_4: true }, { where: { id: { [Op.in]: ids } } });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

module.exports = router;
