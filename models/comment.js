const { sequelize, Sequelize } = require("../config/database");

const Comment = sequelize.define(
  "Comment",
  {
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(2000),
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
