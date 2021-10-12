const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/jwt");

const Qna = require("../../models").Qna;
const Class = require("../../models").Class;

// 구매자, 판매자 : 상품상세 > 문의
router.post("/get", async (req, res, next) => {
  let result = [];
  try {
    const findAllQna = await Qna.findAll({
      where: { classId: req.body.classId },
      order: [["createdAt", "Desc"]],
    });
    findAllQna.forEach((v) => {
      result.push(v.dataValues);
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send("error");
  }
});

router.post("/gett", async (req, res, next) => {
  let jsonResult = {};
  let result = [];
  let page = req.body.page;
  let offset = 0;
  if (page > 1) offset = 5 * (page - 1);
  try {
    const findAndCountAllQna = await Qna.findAndCountAll({
      where: { classId: req.body.classId },
      order: [["createdAt", "Desc"]],
      offset,
      limit: 5,
    });
    findAndCountAllQna.rows.forEach((v) => {
      result.push(v.dataValues);
    });
    jsonResult.count = findAndCountAllQna.count;
    jsonResult.result = result;

    return res.status(200).json(jsonResult);
  } catch (error) {
    return res.status(401).send("error");
  }
});

// 판매자 : 내정보 > 문의관리
router.post("/page/seller", verifyToken, async (req, res, next) => {
  let jsonResult = {};
  let result = [];
  let page = req.body.page;
  let offset = 0;
  if (page > 1) offset = 5 * (page - 1);
  try {
    const findAndCountAllQna = await Qna.findAndCountAll({
      where: {
        sellerId: req.decoded.id,
        state:
          req.body.answerState === "0"
            ? 0
            : req.body.answerState === "1"
            ? 1
            : [0, 1],
      },
      order: [["createdAt", "Desc"]],
      offset,
      limit: 5,
      include: [
        {
          model: Class,
        },
      ],
    });
    findAndCountAllQna.rows.forEach((v) => {
      result.push(v.dataValues);
    });
    jsonResult.count = findAndCountAllQna.count;
    jsonResult.result = result;
    return res.status(200).json(jsonResult);
  } catch (error) {
    return res.status(401).send("error");
  }
});

// 구매자 : 내정보 > 문의내역
router.post("/page/user", verifyToken, async (req, res, next) => {
  let jsonResult = {};
  let result = [];
  let page = req.body.page;
  let offset = 0;
  if (page > 1) offset = 5 * (page - 1);
  try {
    const findAndCountAllQna = await Qna.findAndCountAll({
      where: {
        userId: req.decoded.id,
        state:
          req.body.answerState === "0"
            ? 0
            : req.body.answerState === "1"
            ? 1
            : [0, 1],
      },
      order: [["createdAt", "Desc"]],
      offset,
      limit: 5,
      include: [
        {
          model: Class,
        },
      ],
    });
    findAndCountAllQna.rows.forEach((v) => {
      result.push(v.dataValues);
    });
    jsonResult.count = findAndCountAllQna.count;
    jsonResult.result = result;
    return res.status(200).json(jsonResult);
  } catch (error) {
    return res.status(401).send("error");
  }
});

// 판매자 : 내정보 > 문의관리 > 문의상세
router.post("/detail", async (req, res, next) => {
  console.log(req.body);
  try {
    const findOneQna = await Qna.findOne({
      where: { id: req.body.id },
      include: [
        {
          model: Class,
        },
      ],
    });
    console.log(findOneQna.dataValues);
    return res.status(200).json(findOneQna.dataValues);
  } catch (error) {
    return res.status(401).send("error");
  }
});

// 구매자 : 문의
router.post("/question", verifyToken, async (req, res, next) => {
  console.log(req.body);
  console.log(req);
  try {
    await Qna.create({
      question: req.body.question,
      classId: req.body.classId,
      sellerId: req.body.sellerId,
      userId: req.decoded.id,
    });
    res.status(200).send("SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(500).send("FAIL");
  }
});

// 판매자 : 문의관리 > 문의상세 >> 문의답변
router.post("/answer", verifyToken, async (req, res, next) => {
  try {
    await Qna.update(
      {
        answer: req.body.answer,
        state: 1,
      },
      { where: { id: req.body.id } }
    );
    res.status(200).send("SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(500).send("FAIL");
  }
});

module.exports = router;
