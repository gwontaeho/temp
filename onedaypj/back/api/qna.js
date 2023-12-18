const express = require("express");
const router = express.Router();
const { verifyToken } = require("../jwt");
const { Op } = require("sequelize");

const Qna = require("../models").Qna;
const Product = require("../models").Product;
const User = require("../models").User;
const Seller = require("../models").Seller;

router.get("/", async (req, res, next) => {
  ///////////////////////////////////////////////////////////////////
  //  클래스 문의 내역
  ///////////////////////////////////////////////////////////////////
  try {
    const findAllQna = await Qna.findAll({
      include: [
        {
          model: User,
          attributes: ["img"],
        },
        {
          model: Seller,
          attributes: ["img", "company"],
        },
      ],
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
router.get("/app", verifyToken, async (req, res, next) => {
  try {
    const findAllQna = await Qna.findAll({
      where: { userId: req.decoded.id },
      order: [["createdAt", "Desc"]],
      include: [
        {
          model: Product,
          attributes: ["name", "category"],
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

router.post("/lookup", verifyToken, async (req, res, next) => {
  /////////////////////////////////////////////////////////////
  //  문의 내역 페이지
  /////////////////////////////////////////////////////////////
  const userId = req.decoded.type === "1" ? req.decoded.id : { [Op.ne]: null };
  const sellerId =
    req.decoded.type === "2" ? req.decoded.id : { [Op.ne]: null };
  const createdAt = req.body.checked
    ? {
        [Op.between]: [
          new Date(req.body.value[0]),
          new Date(
            new Date(new Date(req.body.value[1]).setHours(23)).setMinutes(59)
          ),
        ],
      }
    : { [Op.ne]: null };

  let state;
  if (req.body.state == 2) {
    state = [0, 1];
  } else {
    state = req.body.state;
  }

  let page = req.body.page;
  let offset = 0;
  if (page > 1) offset = 5 * (page - 1);
  try {
    const findAndCountAllQna = await Qna.findAndCountAll({
      where: {
        userId,
        sellerId,
        state,
        createdAt,
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

router.get("/unanswered", verifyToken, async (req, res, next) => {
  /////////////////////////////////////////////////////////////////////
  //  미답변 문의
  /////////////////////////////////////////////////////////////////////
  try {
    const findAllQna = await Qna.findAll({
      where: { sellerId: req.decoded.id, state: 0 },
      order: [["createdAt", "Desc"]],
      include: [
        {
          model: Product,
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

////////////////////////////////////////////////////////////////////
//  qna 상세
////////////////////////////////////////////////////////////////////
router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const findOneQna = await Qna.findOne({
      where: { id: req.params.id },
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

router.post("/", verifyToken, async (req, res, next) => {
  ///////////////////////////////////////////////////////////////////
  //  사용자 클래스 문의 생성
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

router.put("/", verifyToken, async (req, res, next) => {
  ///////////////////////////////////////////////////////////////////
  //  사용자 클래스 문의 수정
  ///////////////////////////////////////////////////////////////////
  try {
    const findQna = await Qna.findOne({
      where: { id: req.body.id },
      attributes: ["state"],
    });
    if (findQna.dataValues.state === 0) {
      try {
        await Qna.update(
          {
            question: req.body.question,
          },
          { where: { id: req.body.id } }
        );
        res.status(200).send();
      } catch (error) {
        console.log(error);
        res.status(500).send();
      }
    }
  } catch (error) {
    res.status(500).send();
  }
});

router.put("/answer", verifyToken, async (req, res, next) => {
  ///////////////////////////////////////////////////////////////////
  //  클래스 문의 답변
  ///////////////////////////////////////////////////////////////////
  try {
    await Qna.update(
      {
        answer: req.body.answer,
        state: 1,
      },
      { where: { id: req.body.id } }
    );
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
