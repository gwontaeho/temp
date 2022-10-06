module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Post", {
        title: {
            type: DataTypes.TEXT,
            unique: true,
        },
        text: {
            type: DataTypes.TEXT,
        },
    });
};
