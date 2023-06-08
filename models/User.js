module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        email_kakao: {
            type: DataTypes.STRING(20),
            // unique: true,
        },
        email: {
            type: DataTypes.STRING(20),
            unique: true,
        },
        password: {
            type: DataTypes.STRING(20),
        },
        isExpert: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isAllowedNotification: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        hasNewNotification: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
};
