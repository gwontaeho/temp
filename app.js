require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const app = express();
const port = 4000;
const routers = require("./routers");
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

sequelize
    .sync({
        force: true,
    })
    .then(() => {
        console.log("db 연결");
    })
    .catch((error) => {
        console.log(error);
    });

app.use("/api", routers);

app.listen(port, () => {});
