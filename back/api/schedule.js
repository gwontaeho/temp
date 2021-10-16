const express = require("express");
const router = express.Router();
const { verifyToken } = require("../jwt");
const { Op } = require("sequelize");

const Schedule = require("../models").Schedule;
const Product = require("../models").Product;
const { Reservation } = require("../models");

router.get("/", verifyToken, async (req, res, next) => {
  //////////////////////////////////////////////////////////////////////
  //  판매자 스케줄 / 월별
  //////////////////////////////////////////////////////////////////////
  const productId =
    req.query.productId === "0" ? { [Op.ne]: null } : req.query.productId;
  try {
    const findAllSchedule = await Schedule.findAll({
      include: [
        {
          model: Product,
          attributes: ["name"],
        },
      ],
      where: {
        ymd: {
          [Op.startsWith]: req.query.ym,
        },
        productId: productId,
      },
      order: [
        ["start", "asc"],
        ["end", "asc"],
      ],
    });
    const response = findAllSchedule.map((v) => {
      return v.dataValues;
    });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send();
  }
});

router.get("/:id", verifyToken, async (req, res, next) => {
  //////////////////////////////////////////////////////////////////////
  //  판매자 일정 상세
  //////////////////////////////////////////////////////////////////////
  try {
    const findSchedule = await Schedule.findOne({
      include: [
        {
          model: Product,
        },
        {
          model: Reservation,
        },
      ],
      where: { id: req.params.id },
    });
    return res.status(200).send(findSchedule.dataValues);
  } catch (error) {
    return res.status(500).send();
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  //////////////////////////////////////////////////////////////////
  // 판매자 스케줄 생성
  //////////////////////////////////////////////////////////////////
  try {
    await Schedule.create({
      ymd: req.body.ymd,
      start: req.body.start,
      end: req.body.end,
      personnel: req.body.personnel,
      productId: req.body.productId,
    });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.put("/", verifyToken, async (req, res, next) => {
  ///////////////////////////////////////////////////////////////
  //  일정 종료
  ///////////////////////////////////////////////////////////////
  let count;
  try {
    count = await Reservation.count({
      where: { state: [2, 4], scheduleId: req.body.id },
    });
  } catch (error) {
    return res.status(500).send();
  }
  if (count > 0) return res.status(400).send();
  else {
    try {
      await Schedule.update(
        { state: 1 },
        { where: { id: req.body.id }, individualHooks: true }
      );
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send();
    }
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
