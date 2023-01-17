const express = require("express");
const router = express();
const { sequelize, Price } = require("../models");

// 희망가격 평균 조회
router.get("/", async (req, res, next) => {
    try {
        const prices = await Price.findAll({
            attributes: [
                "category",
                [sequelize.fn("AVG", sequelize.col("price_60")), "avg_price_60"],
                [sequelize.fn("AVG", sequelize.col("price_90")), "avg_price_90"],
                [sequelize.fn("AVG", sequelize.col("price_120")), "avg_price_120"],
                [sequelize.fn("AVG", sequelize.col("price_150")), "avg_price_150"],
            ],
            group: "category",
        });

        return res.send(prices);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 업체별 희망가격 조회
router.get("/companies/:CompanyId", async (req, res, next) => {
    const { CompanyId } = req.params;
    console.log(CompanyId);
    try {
        const prices = await Price.findAll({ where: { CompanyId } });
        return res.send(prices);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 희망가격 설정
router.post("/", async (req, res, next) => {
    const { CompanyId, category } = req.body;
    try {
        const price = await Price.findOne({ where: { CompanyId, category } });

        if (price) await price.update(req.body);
        else await Price.create(req.body);

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// 희망가격 수정
router.put("/", async (req, res, next) => {
    // console.log(req.body);
    try {
        await Price.update(req.body, { where: { category: "아로마" } });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = router;
