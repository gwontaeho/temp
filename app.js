require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize, Request } = require("./models");
const dayjs = require("dayjs");
const app = express();
const port = 4000;
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
        // force: true,
        // alter: true,
    })
    .then(() => {
        console.log("db 연결");
    })
    .catch((error) => {
        console.log(error);
    });

app.use("/api", routers);

app.listen(port, () => {
    console.log(process.env.NODE_ENV);
});

setInterval(async () => {
    const updatedAtLt = dayjs().subtract(30, "m").toDate();
    await Request.update({ status: 0 }, { where: { status: 1, updatedAt: { [Op.lt]: updatedAtLt } } });
}, 60000);
