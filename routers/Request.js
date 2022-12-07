const express = require("express");
const router = express();

const { Request } = require("../models");
const { signToken } = require("../middlewares/jwt");

router.get("/", async (req, res, next) => {
    try {
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

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
