const express = require("express");
const router = express();
const { Review, Request, Blacklist } = require("../models");
const { verifyToken } = require("../middlewares/jwt");

// 업체 : 리뷰작성
router.post("/company", verifyToken, async (req, res, next) => {
    const UserId = req.decoded.id;
    const { id, TargetId, content, block } = req.body;
    try {
        await Review.create({ UserId, TargetId, RequestId: id, content });
        await Request.update({ hasReview: true }, { where: { id } });
        if (block) await Blacklist.create({ UserId, TargetId });

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = router;
