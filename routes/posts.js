const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// GET /api/posts
router.get("/posts", postController.getAllPosts);

// GET /api/posts/:id
router.get("/posts/:id", postController.getPostById);

// POST /api/posts
router.post("/posts", postController.createPost);

// PUT /api/posts/:id
router.put("/posts/:id", postController.updatePost);

// DELETE /api/posts/:id
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
