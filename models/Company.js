module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Company", {
        name: {
            type: DataTypes.STRING(20),
        },
        expiration: {
            type: DataTypes.STRING(8),
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 6),
        },
        longitude: {
            type: DataTypes.DECIMAL(10, 6),
        },
        distance: {
            type: DataTypes.INTEGER,
            defaultValue: 30000,
        },
        max_count: {
            type: DataTypes.INTEGER,
            defaultValue: 2,
        },
        blocked_t: {
            type: DataTypes.DATE,
        },
    });
};
