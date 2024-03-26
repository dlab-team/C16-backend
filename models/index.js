// models
const Role = require("./role");
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const Resource = require("./resource");
const Material = require("./material");


// relationships
User.belongsTo(Role, { foreignKey: 'roleId' });

Comment.belongsTo(User, { foreignKey: "userId", as: "user" });
Comment.belongsTo(Post, { foreignKey: "postId" });

Post.hasMany(Comment, {
  as: "comments",
  foreignKey: "postId",
  onDelete: "CASCADE",
});
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

Resource.belongsTo(User, { foreignKey: "userId" });

Material.belongsTo(User, { foreignKey: "userId" });


module.exports = {
  Role,
  User,
  Post,
  Comment,
  Resource,
  Material,
};
