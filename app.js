require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const app = express();
const port = 3000;
const router = require("./router");
app.use(express.json());
app.use(express.static("public"));

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("db 연결");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", router);

app.listen(port, () => {
  console.log("zzzz");
  console.log("zzzz----------------------------");
});
