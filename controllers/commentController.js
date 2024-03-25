const { Post, Comment, User } = require("../models/index");
const {
  getPagination,
  getPaginationData,
} = require("../utils/paginationHelper");

// GET /api/posts/:postId/comments
exports.getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const { page, limit } = req.query;
    const { currentPage, pageSize, offset } = getPagination(page, limit);
    const post = await Post.findByPk(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: `Post with id=${postId} not found` });
    }
    const { count, rows } = await Comment.findAndCountAll({
      where: { postId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstname", "lastname", "photo", "region", "comuna"],
        },
      ],
      offset,
      limit: pageSize,
    });
    const response = getPaginationData({ count, rows }, currentPage, pageSize);
    res.json(response);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/posts/:postId/comments
exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, userId } = req.body;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: `Post with id=${postId} not found` });
    }
    const comment = await Comment.create({ content, userId, postId });
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/comments/:commentId
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const [numAffectedRows] = await Comment.update(
      { content },
      { where: { id: commentId } }
    );
    if (numAffectedRows > 0) {
      const updatedComment = await Comment.findByPk(commentId, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["firstname", "lastname", "photo", "region", "comuna"],
          },
        ],
      });
      res.json(updatedComment);
    } else {
      res
        .status(404)
        .json({ message: `Comment with id=${commentId} not found` });
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/comments/:commentId
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const numDeleted = await Comment.destroy({ where: { id: commentId } });
    if (numDeleted) {
      res.status(204).json({ message: "Comment deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: `Comment with id=${commentId} not found` });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
