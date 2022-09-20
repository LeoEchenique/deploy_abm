const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "User",
        {
            Id: {
                type: DataTypes.INTEGER(),
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            Name: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            Email: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            Password: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            Picture: {
                type: DataTypes.STRING(),
            },
            Token: {
                type: DataTypes.STRING(),
                defaultValue: null,
            },
        },
        { timestamps: false }
    );
};
