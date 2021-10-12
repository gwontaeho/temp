const express = require("express");
const router = express.Router();
const { verifyToken } = require("../jwt");

const Qna = require("../models").Qna;
const Product = require("../models").Product;

router.get("/", async (req, res, next) => {
  ///////////////////////////////////////////////////////////////////
  //  클래스 문의 내역
  ///////////////////////////////////////////////////////////////////
  try {
    const findAllQna = await Qna.findAll({
      where: { productId: req.query.productId },
      order: [["createdAt", "Desc"]],
    });
    const response = findAllQna.map((v) => {
      return v.dataValues;
    });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send();
  }
});

/////////////////////////////////////////////////////////////////
//  앱 문의내역
/////////////////////////////////////////////////////////////////
router.post("/app/user", verifyToken, async (req, res, next) => {
  try {
    const findAllQna = await Qna.findAll({
      where: { userId: req.decoded.id },
      order: [["createdAt", "Desc"]],
      include: [
        {
          model: Product,
          attributes: ["name"],
        },
      ],
    });
    const response = findAllQna.map((v) => {
      return v.dataValues;
    });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send();
  }
});

// 판매자 : 내정보 > 문의관리
router.post("/seller", verifyToken, async (req, res, next) => {
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
          model: Product,
        },
      ],
    });
    let response = {};
    response.count = findAndCountAllQna.count;
    response.data = findAndCountAllQna.rows.map((v) => {
      return v.dataValues;
    });
    console.log(response);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send();
  }
});

// 구매자 : 내정보 > 문의내역
router.post("/user", verifyToken, async (req, res, next) => {
  let state;
  if (req.body.answerState == 2) {
    state = [0, 1];
  } else {
    state = req.body.answerState;
  }

  let page = req.body.page;
  let offset = 0;
  if (page > 1) offset = 5 * (page - 1);
  try {
    const findAndCountAllQna = await Qna.findAndCountAll({
      where: {
        userId: req.decoded.id,
        state,
      },
      order: [["createdAt", "Desc"]],
      offset,
      limit: 5,
      include: [
        {
          model: Product,
        },
      ],
    });
    let response = {};
    response.data = findAndCountAllQna.rows.map((v) => {
      return v.dataValues;
    });
    response.count = findAndCountAllQna.count;
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send();
  }
});

////////////////////////////////////////////////////////////////////
//  qna 상세
////////////////////////////////////////////////////////////////////
router.post("/detail", verifyToken, async (req, res, next) => {
  try {
    const findOneQna = await Qna.findOne({
      where: { id: req.body.id },
      include: [
        {
          model: Product,
        },
      ],
    });
    return res.status(200).send(findOneQna.dataValues);
  } catch (error) {
    return res.status(500).send();
  }
});

// 구매자 : 문의
router.post("/question", verifyToken, async (req, res, next) => {
  console.log(req.body.question);
  ///////////////////////////////////////////////////////////////////
  //  클래스 문의
  ///////////////////////////////////////////////////////////////////
  try {
    await Qna.create({
      question: req.body.question,
      productId: req.body.productId,
      sellerId: req.body.sellerId,
      userId: req.decoded.id,
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
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
