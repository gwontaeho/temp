require("dotenv").config();

const development = {
    username: "root",
    password: "",
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
    username: "root",
    password: "Changeme_123",
    database: "kys_production",
    host: "127.0.0.1",
    dialect: "mysql",
};

module.exports = { development, test, production };
