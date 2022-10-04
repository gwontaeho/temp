module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        email: {
            type: DataTypes.STRING(40),
            unique: true,
        },
        password: {
            type: DataTypes.STRING(40),
        },
        type: {
            type: DataTypes.STRING(20),
        },
        role: {
            type: DataTypes.STRING(10),
        },
    });
};
