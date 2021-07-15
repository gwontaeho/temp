const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middlewares/jwt");

const Reservation = require("../../models").Reservation;
const Class = require("../../models").Class;

router.post("/", verifyToken, async (req, res, next) => {
  console.log(req.body);
  console.log(req.decoded.id);

  try {
    await Reservation.create({
      name: req.body.name,
      phone: req.body.phone,
      personnel: req.body.personnel,
      sellerId: req.body.sellerId,
      scheduleId: req.body.scheduleId,
      classId: req.body.classId,
      userId: req.decoded.id,
    });
    res.status(200).send("RESERVATION SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(500).send("RESERVATION FAIL");
  }
});

router.post("/history", verifyToken, async (req, res, next) => {
  console.log(req.body);
  console.log(req.decoded.id);

  console.log(req.decoded);
  let result = [];
  try {
    const findAllReservation = await Reservation.findAll({
      include: [
        {
          model: Class,
          attributes: ["name", "img"],
        },
      ],
      where: { userId: req.decoded.id },
      order: [["createdAt", "DESC"]],
    });
    findAllReservation.forEach((v) => {
      result.push(v.dataValues);
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/history/detail", verifyToken, async (req, res, next) => {
  console.log(req.body);
  console.log(req.decoded.id);

  console.log(req.decoded);
  try {
    const findReservation = await Reservation.findOne({
      include: [
        {
          model: Class,
          attributes: ["name", "img"],
        },
      ],
      where: { id: req.body.id },
    });
    console.log(findReservation);
    return res.status(200).send(findReservation);
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/history/seller", verifyToken, async (req, res, next) => {
  console.log(req.body);
  console.log(req.decoded.id);

  console.log(req.decoded);
  let result = [];
  try {
    const findAllReservation = await Reservation.findAll({
      include: [
        {
          model: Class,
          attributes: ["name", "img"],
        },
      ],
      where: { sellerId: req.decoded.id },
      order: [["createdAt", "DESC"]],
    });
    findAllReservation.forEach((v) => {
      result.push(v.dataValues);
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send("error");
  }
});

module.exports = router;
