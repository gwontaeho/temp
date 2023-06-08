module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Tag", {
        sequence: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    });
};
