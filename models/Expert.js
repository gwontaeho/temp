module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Expert", {
        nickname: {
            type: DataTypes.STRING(10),
        },
        contact: {
            type: DataTypes.STRING(11),
        },
        introduction: {
            type: DataTypes.TEXT,
        },
        tags: {
            type: DataTypes.TEXT,
        },
    });
};
