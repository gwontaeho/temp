module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Price", {
        category: {
            type: DataTypes.STRING(20),
        },
        price_60: {
            type: DataTypes.INTEGER,
        },
        price_90: {
            type: DataTypes.INTEGER,
        },
        price_120: {
            type: DataTypes.INTEGER,
        },
        price_150: {
            type: DataTypes.INTEGER,
        },
    });
};
