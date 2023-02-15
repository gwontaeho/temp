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
        company_name: {
            type: DataTypes.STRING(20),
        },
        terms: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        fcm_token: {
            type: DataTypes.STRING(300),
        },
        last_login: {
            type: DataTypes.DATE,
        },
    });
};
