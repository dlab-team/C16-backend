const { sequelize, Sequelize } = require("../config/database");

const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: Sequelize.STRING(2000),
      allowNull: false,
    },
    author: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Comment;
