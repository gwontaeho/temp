const express = require("express");
const router = express.Router();

const { verifyToken } = require("../jwt");

const { Op } = require("sequelize");
const Reservation = require("../models").Reservation;
const Product = require("../models").Product;
const Schedule = require("../models").Schedule;
const Review = require("../models").Review;

router.post("/", verifyToken, async (req, res, next) => {
  /////////////////////////////////////////////////////////////
  // 예약생성
  /////////////////////////////////////////////////////////////
  try {
    const findSchedule = await Schedule.findOne({
      where: { id: req.body.scheduleId },
    });
    if (
      findSchedule.dataValues.reserved + req.body.personnel <=
      findSchedule.dataValues.personnel
    ) {
      try {
        await Reservation.create({
          name: req.body.name,
          phone: req.body.phone,
          personnel: req.body.personnel,
          sellerId: req.body.sellerId,
          scheduleId: req.body.scheduleId,
          productId: req.body.productId,
          userId: req.decoded.id,
        });
        res.status(200).send();
      } catch (error) {
        console.log(error);
        res.status(500).send();
      }
    } else {
      return res.status(400).send();
    }
  } catch (error) {
    return res.status(500).send();
  }
});

router.get("/", verifyToken, async (req, res, next) => {
  const userId = req.decoded.type === "1" ? req.decoded.id : { [Op.ne]: null };
  const sellerId =
    req.decoded.type === "2" ? req.decoded.id : { [Op.ne]: null };
  ///////////////////////////////////////////////////////////////
  //  예약 내역
  ///////////////////////////////////////////////////////////////
  try {
    const findAllReservation = await Reservation.findAll({
      include: [
        {
          model: Product,
          attributes: ["name", "img", "category"],
        },
        {
          model: Schedule,
          attributes: ["ymd", "start", "end"],
        },
      ],
      where: {
        userId,
        sellerId,
        state: req.query.state === "1" ? [1, 5] : req.query.state,
      },
      order: [["createdAt", "DESC"]],
    });
    const response = findAllReservation.map((v) => {
      return v.dataValues;
    });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send();
  }
});

router.get("/count", verifyToken, async (req, res, next) => {
  const userId = req.decoded.type === "1" ? req.decoded.id : { [Op.ne]: null };
  const sellerId =
    req.decoded.type === "2" ? req.decoded.id : { [Op.ne]: null };
  ///////////////////////////////////////////////////////////////
  //  예약 내역 카운트
  ///////////////////////////////////////////////////////////////
  try {
    const a = await Reservation.count({
      where: {
        userId,
        sellerId,
        state: 0,
      },
    });
    const b = await Reservation.count({
      where: {
        userId,
        sellerId,
        state: 1,
      },
    });
    const c = await Reservation.count({
      where: {
        userId,
        sellerId,
        state: 2,
      },
    });
    const d = await Reservation.count({
      where: {
        userId,
        sellerId,
        state: 3,
      },
    });
    const e = await Reservation.count({
      where: {
        userId,
        sellerId,
        state: 4,
      },
    });
    const f = await Reservation.count({
      where: {
        userId,
        sellerId,
        state: 5,
      },
    });
    const response = { a, b, c, d, e, f };
    console.log(response);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send();
  }
});

router.get("/unwritten", verifyToken, async (req, res, next) => {
  ///////////////////////////////////////////////////////////////
  //  후기 미 작성 예약 내역
  ///////////////////////////////////////////////////////////////
  try {
    const findAllReservation = await Reservation.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "img", "category"],
        },
        {
          model: Schedule,
          attributes: ["ymd", "start", "end"],
        },
      ],
      where: { userId: req.decoded.id, state: 1 },
    });
    const response = findAllReservation.map((v) => {
      return v.dataValues;
    });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send();
  }
});

router.get("/:id", verifyToken, async (req, res, next) => {
  console.log(req.params.id);
  ///////////////////////////////////////////////////////////////
  //  예약 상세
  ///////////////////////////////////////////////////////////////
  try {
    const findReservation = await Reservation.findOne({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "img", "price", "address", "category"],
        },
        {
          model: Schedule,
          attributes: ["ymd", "start", "end", "personnel"],
        },
        {
          model: Review,
        },
      ],
      where: { id: req.params.id },
    });
    return res.status(200).send(findReservation);
  } catch (error) {
    return res.status(500).send();
  }
});

router.put("/", verifyToken, async (req, res, next) => {
  ////////////////////////////////////////////////////////
  //  예약 확정
  ////////////////////////////////////////////////////////
  try {
    await Reservation.update({ state: 0 }, { where: { id: req.body.id } });
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
});

router.put("/cancel", verifyToken, async (req, res, next) => {
  ////////////////////////////////////////////////////////
  // 예약 취소
  ////////////////////////////////////////////////////////
  try {
    await Reservation.update(
      { state: 3 },
      { where: { id: req.body.id }, individualHooks: true }
    );
    return res.status(200).send("success");
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.put("/cancel/waiting", verifyToken, async (req, res, next) => {
  ////////////////////////////////////////////////////////
  // 대기중 예약 취소
  ////////////////////////////////////////////////////////
  try {
    const findReservation = await Reservation.findOne({
      where: { id: req.body.id },
    });
    if (findReservation.dataValues.state === 4) {
      try {
        await Reservation.update(
          { state: 3 },
          { where: { id: req.body.id }, individualHooks: true }
        );
        return res.status(200).send();
      } catch (error) {
        return res.status(500).send();
      }
    } else {
      return res.status(400).send();
    }
  } catch (error) {
    return res.status(500).send();
  }
});

router.put("/cancel/request", verifyToken, async (req, res, next) => {
  ////////////////////////////////////////////////////////
  //  예약중 취소 요청
  ////////////////////////////////////////////////////////
  try {
    await Reservation.update({ state: 2 }, { where: { id: req.body.id } });
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
});

module.exports = router;
