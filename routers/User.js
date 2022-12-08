const express = require("express");
const router = express();

const { User, Review } = require("../models");
const { signToken } = require("../middlewares/jwt");

router.get("/", async (req, res, next) => {
    try {
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

router.post("/sign", async (req, res, next) => {
    const { phone, device } = req.body;
    try {
        const [user, created] = await User.findOrCreate({ where: { phone }, defaults: { phone, device, role: 0 } });
        if (created) return res.sendStatus(200);

        return res.sendStatus(400);
    } catch (error) {
        console.log(error);
    }
});

router.get("/review", async (req, res, next) => {
    try {
        const user = await User.findByPk(11, {
            include: [{ model: Review }, { model: Review, as: "Reviews_target" }],
        });

        return res.send(user);
    } catch (error) {
        console.log(error);
    }
});

router.get("/test", async (req, res, next) => {
    try {
        const user = await Review.findByPk(11, {
            include: [{ model: User }, { model: User, as: "Target" }],
        });

        return res.send(user);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
