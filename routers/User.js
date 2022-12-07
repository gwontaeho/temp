const express = require("express");
const router = express();

const { User } = require("../models");
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

module.exports = router;
