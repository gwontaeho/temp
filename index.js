require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const aws = require("aws-sdk");
exports.s3 = new aws.S3({
  accessKeyId: "AKIAXMCCKLJBLDFTPR4J",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});
const { sequelize } = require("./models");
const api = require("./api");
const app = express();

app.set("port", process.env.PORT);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", api);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
  console.log(new Date());
});
