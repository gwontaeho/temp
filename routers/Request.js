const express = require("express");
const router = express();
const { Op } = require("sequelize");
const { sequelize, Request } = require("../models");
const { signToken } = require("../middlewares/jwt");

// 요청 목록
router.get("/", async (req, res, next) => {
    const distance = sequelize.fn(
        "ST_Distance_Sphere",
        sequelize.fn("POINT", sequelize.col("longitude"), sequelize.col("latitude")),
        sequelize.fn("POINT", 127.027619, 37.497952)
    );

    try {
        const requests = await Request.findAll({
            attributes: ["id", "address", [distance, "distance"]],
            // where 문 상태 추가 (0)
            // 블랙리스트 추가
            where: [sequelize.where(distance, "<=", 2000), { status: null }],
            order: [["distance", "ASC"]],
        });

        return res.send(requests);
    } catch (error) {
        console.log(error);
    }
});

// 요청 생성
router.post("/", async (req, res, next) => {
    try {
        const request = await Request.create(req.body);
        console.log(request);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
