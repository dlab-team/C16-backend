const { sequelize, Sequelize } = require("../config/database");

const Resource = sequelize.define(
  "Resource",
  {
    author: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(2000),
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Resource;
