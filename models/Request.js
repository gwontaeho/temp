module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Request", {
        category: {
            type: DataTypes.STRING(20),
        },
        time: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        personnel: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING(100),
        },
        status: {
            type: DataTypes.INTEGER,
        },
        address: {
            type: DataTypes.STRING(100),
        },
        address_detail: {
            type: DataTypes.STRING(100),
        },
        latitude: {
            type: DataTypes.DECIMAL,
        },
        longitude: {
            type: DataTypes.DECIMAL,
        },
        share: {
            type: DataTypes.BOOLEAN,
        },
    });
};
