const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");
const { Op } = require("sequelize");

const Schedule = require("../../models").Schedule;
const Class = require("../../models").Class;

router.post("/", async (req, res, next) => {
  let result = [];
  try {
    const findAllSchedule = await Schedule.findAll({
      where: { classId: req.body.classId },
    });
    findAllSchedule.forEach((v) => {
      result.push(v.dataValues);
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send("error");
  }
});

// 상품 > 일정목록
router.post("/product", async (req, res, next) => {
  let result = [];
  try {
    const findAllSchedule = await Schedule.findAll({
      where: {
        classId: req.body.classId,
        ymd: {
          [Op.gt]: req.body.ymd,
        },
      },
      order: [
        ["ymd", "ASC"],
        ["time", "ASC"],
      ],
    });
    findAllSchedule.forEach((v) => {
      result.push(v.dataValues);
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/seller", verifyToken, async (req, res, next) => {
  console.log(req.decoded);
  let result = [];
  try {
    const findAllSchedule = await Schedule.findAll({
      include: [
        {
          model: Class,
          attributes: ["name", "sellerId"],
          where: { sellerId: req.decoded.id },
        },
      ],
      order: [["time", "ASC"]],
    });
    findAllSchedule.forEach((v) => {
      result.push(v.dataValues);
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/detail", verifyToken, async (req, res, next) => {
  try {
    const findSchedule = await Schedule.findOne({
      include: [
        {
          model: Class,
          attributes: ["name", "price", "time"],
        },
      ],
      where: { id: req.body.scheduleId },
    });
    return res.status(200).json(findSchedule.dataValues);
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/finish", verifyToken, async (req, res, next) => {
  try {
    await Schedule.update(
      { state: 1 },
      { where: { id: req.body.scheduleId }, individualHooks: true }
    );
    return res.status(200).send("success");
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/add", verifyToken, async (req, res, next) => {
  try {
    await Schedule.create({
      ymd: req.body.ymd,
      time: req.body.time,
      personnel: req.body.personnel,
      classId: req.body.classId,
    });
    return res.status(200).send("SCHEDULE ADD SUCCESS");
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/delete", verifyToken, async (req, res, next) => {
  console.log(req.body);
  try {
    await Schedule.destroy({
      where: { id: req.body.id },
    });
    return res.status(200).send("SCHEDULE REMOVE SUCCESS");
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
