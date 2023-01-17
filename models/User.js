module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        phone: {
            type: DataTypes.STRING(11),
        },
        device: {
            type: DataTypes.STRING(100),
        },
        role: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    });
};
