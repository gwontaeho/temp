require("dotenv").config();

const development = {
    username: "root",
    password: null,
    database: "kys_development",
    host: "127.0.0.1",
    dialect: "mysql",
};
const test = {
    username: "root",
    password: null,
    database: "kys_test",
    host: "127.0.0.1",
    dialect: "mysql",
};
const production = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    dialect: "mysql",
};

module.exports = { development, test, production };
