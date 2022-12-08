module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Company", {
        name: {
            type: DataTypes.STRING(20),
        },
        expiration: {
            type: DataTypes.DATE,
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 6),
        },
        longitude: {
            type: DataTypes.DECIMAL(10, 6),
        },
    });
};
