const { sequelize, Sequelize } = require("../config/database");
const Comment = require("./comment");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      allowNull: true,
    },
    author: {
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

Post.hasMany(Comment, {
  as: "comments",
  foreignKey: "postId",
  onDelete: "CASCADE",
});

module.exports = Post;
