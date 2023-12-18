require("dotenv").config();

const development = {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: "kys_development",
    host: process.env.DEV_DB_HOST,
    dialect: "mysql",
};
const test = {
    username: "root",
    password: "Changeme_123",
    database: "kys_test",
    host: "127.0.0.1",
    dialect: "mysql",
};
const production = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "kys_production",
    host: process.env.DB_HOST,
    dialect: "mysql",
};

module.exports = { development, test, production };
