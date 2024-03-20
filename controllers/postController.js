const { Post, Comment } = require("../models/index");
const {
  getPagination,
  getPaginationData,
} = require("../utils/paginationHelper");
const { Op } = require("sequelize");

// GET /api/posts
exports.getAllPosts = async (req, res) => {
  try {
    const { currentPage, pageSize, offset } = getPagination(
      req.query.page,
      req.query.limit
    );
    const searchTerm = req.query.search || "";
    const { count, rows } = await Post.findAndCountAll({
      include: [
        {
          model: Comment,
          as: "comments",
        },
      ],
      offset,
      limit: pageSize,
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            content: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        ],
      },
    });
    const response = getPaginationData({ count, rows }, currentPage, pageSize);
    res.json(response);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/posts/:id
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          as: "comments",
        },
      ],
    });
    if (post) {
      res.json(post);
    } else {
      res
        .status(404)
        .json({ message: `Post with id=${req.params.id} not found` });
    }
  } catch (error) {
    console.error("Error retrieving post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/posts
exports.createPost = async (req, res) => {
  try {
    const { userId, title, content, image } = req.body;
    const newPost = await Post.create({ userId, title, content, image });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/posts/:id
exports.updatePost = async (req, res) => {
  try {
    const { userId, title, content, image } = req.body;
    const numAffectedRows = await Post.update(
      { userId, title, content, image },
      { where: { id: req.params.id } }
    );
    if (numAffectedRows[0] > 0) {
      const updatedPost = await Post.findByPk(req.params.id);
      res.json(updatedPost);
    } else {
      res
        .status(404)
        .json({ message: `Post with id=${req.params.id} not found` });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
  try {
    const numDeleted = await Post.destroy({ where: { id: req.params.id } });
    if (numDeleted) {
      res.status(204).json({ message: "Post deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: `Post with id=${req.params.id} not found` });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
