const Post = require("../models/post");
const Comment = require("../models/comment");
const { Op } = require("sequelize");

// GET /api/posts
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const offset = (page - 1) * limit;
    const searchTerm = req.query.search || ""; // Get the search term from the query string

    const { count, rows } = await Post.findAndCountAll({
      include: [
        {
          model: Comment,
          as: "comments",
        },
      ],
      offset,
      limit,
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchTerm}%` } },
          { content: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      data: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
      },
    });
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
    const { title, content, image, author } = req.body;
    const newPost = await Post.create({ title, content, image, author });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/posts/:id
exports.updatePost = async (req, res) => {
  try {
    const { title, content, image, author } = req.body;
    const numAffectedRows = await Post.update(
      {
        title,
        content,
        image,
        author,
      },
      {
        where: { id: req.params.id },
      }
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
    const numDeleted = await Post.destroy({
      where: { id: req.params.id },
    });

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
