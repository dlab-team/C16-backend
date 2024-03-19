const { sequelize, Sequelize } = require("../config/database");

const User = sequelize.define(
    'User', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.STRING,
    },
    rut: {
        type: Sequelize.STRING,
    },
    birthday: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    region: {
        type: Sequelize.STRING,
    },
    comuna: {
        type: Sequelize.STRING,
    },
    takesCare: {
        type: Sequelize.STRING,
    },
    photo: {
        type: Sequelize.STRING,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue:  false
    }
});

module.exports = User; 