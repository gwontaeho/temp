module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Application", {
        content: {
            type: DataTypes.TEXT,
        },
    });
};
