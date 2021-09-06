const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");

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
      time: req.body.time,
      personnel: req.body.personnel,
      reserved: 0,
      classId: req.body.classId,
      state: 0,
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
