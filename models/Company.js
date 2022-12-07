module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Company", {
        name: {
            type: DataTypes.STRING(20),
        },
        expiration: {
            type: DataTypes.DATE,
        },
    });
};
