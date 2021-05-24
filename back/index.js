require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const { sequelize } = require("./models");
sequelize.sync();
// sequelize.sync({ force: true });

const api = require("./routes/api");

const app = express();
app.set("port", process.env.PORT || 3005);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/api", api);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
