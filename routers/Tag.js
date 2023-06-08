const express = require("express");
const router = express();
const { Tag } = require("../models");

router.get("/", async (req, res, next) => {
    try {
        const tags = await Tag.findAll({ order: [["sequence", "ASC"]], raw: true });
        return res.send(tags);
    } catch (error) {
        return res.sendStatus(500);
    }
});

module.exports = router;
