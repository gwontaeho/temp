const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");

const Schedule = require("../../models").Schedule;

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

router.post("/add", verifyToken, async (req, res, next) => {
  console.log(req.body);
  try {
    await Schedule.create({
      time: req.body.time,
      personnel: req.body.personnel,
      reserved: 0,
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
