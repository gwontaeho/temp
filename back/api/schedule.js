const express = require("express");
const router = express.Router();
const { verifyToken } = require("../jwt");
const { Op } = require("sequelize");

const Schedule = require("../models").Schedule;
const Product = require("../models").Product;

router.post("/seller/product", async (req, res, next) => {
  ////////////////////////////////////////////////////////////////////
  //  판매자 클래스 스케줄
  ////////////////////////////////////////////////////////////////////
  try {
    const findAllSchedule = await Schedule.findAll({
      where: { productId: req.body.productId },
    });
    const response = findAllSchedule.map((v) => {
      return v.dataValues;
    });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send();
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
          model: Product,
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
          model: Product,
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

router.post("/create", verifyToken, async (req, res, next) => {
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
