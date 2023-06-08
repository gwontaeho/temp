module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Notification", {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
        },
        href: {
            type: DataTypes.TEXT,
        },
    });
};
