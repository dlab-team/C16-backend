const { sequelize, Sequelize } = require("../config/database");

const Role = sequelize.define(
  "Role",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Role;