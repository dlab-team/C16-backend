const { sequelize, Sequelize } = require("../config/database");


const Material = sequelize.define(
    "material", {
    publisher: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    materialURL: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    
});

module.exports = Material;  