const express = require("express");
const router = express();
const { Op } = require("sequelize");
const { sequelize, Company } = require("../models");
const { signToken } = require("../middlewares/jwt");

// 주위 업체
router.get("/", async (req, res, next) => {
    const distance = sequelize.fn(
        "ST_Distance_Sphere",
        sequelize.fn("POINT", sequelize.col("longitude"), sequelize.col("latitude")),
        sequelize.fn("POINT", 127.027619, 37.497952)
    );

    try {
        const requests = await Company.findAll({
            attributes: ["id", "address", [distance, "distance"]],
            where: [sequelize.where(distance, "<=", 2000), { status: null }],
            order: [["distance", "ASC"]],
        });

        return res.send(requests);
    } catch (error) {
        console.log(error);
    }
});

// 업체 등록
router.post("/", async (req, res, next) => {
    try {
        await Company.create(req.body);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
