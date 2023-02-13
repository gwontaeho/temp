module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Request", {
        category: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        personnel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(100),
        },
        description_company: {
            type: DataTypes.STRING(100),
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        address_detail: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        address_short: {
            type: DataTypes.STRING(10),
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false,
        },
        distance: {
            type: DataTypes.STRING(10),
        },
        share: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        phone: {
            type: DataTypes.STRING(11),
        },
        completedAt: {
            type: DataTypes.DATE,
        },
        hasReview: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isDeleted_1: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isDeleted_2: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isDeleted_3: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isDeleted_4: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
};
