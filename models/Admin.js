module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Admin",
        {
            type: {
                type: DataTypes.STRING(20),
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        { timestamps: false }
    );
};
