module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Project", {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        tags: {
            type: DataTypes.TEXT,
        },
        isOpen: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });
};
