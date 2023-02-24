require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize, Request, User } = require("./models");
const dayjs = require("dayjs");
const app = express();
const port = 3000;
const routers = require("./routers");
const { Op } = require("sequelize");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

sequelize
    .sync({
        // alter: true,
    })
    .then(() => {
        console.log("db 연결");
    })
    .catch((error) => {
        console.log(error);
    });

app.use("/api", routers);

app.listen(port, () => {});

setInterval(async () => {
    const updatedAtLt = dayjs().subtract(30, "m").toDate();
    try {
        const findAll = await Request.findAll({
            where: { status: [1, 2], updatedAt: { [Op.lt]: updatedAtLt } },
            attributes: ["id"],
            include: [{ model: User, attributes: ["fcm_token"] }],
        });
        const ids = findAll.map((v) => v.id);
        const tokens = findAll.map((v) => v.User["fcm_token"]).filter(Boolean);
        await Request.update({ status: 0 }, { where: { id: ids, status: [1, 2], updatedAt: { [Op.lt]: updatedAtLt } } });
        if (tokens.length > 0) {
            const message = { notification: { title: "30분이 지나 요청이 취소되었습니다", body: "요청 확인하기" } };
            await admin.messaging().sendToDevice(tokens, message);
        }
    } catch (error) {}
}, 60000);
