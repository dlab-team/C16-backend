const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// GET /api/posts/:postId/comments
router.get("/posts/:postId/comments", commentController.getCommentsByPostId);

// POST /api/posts/:postId/comments
router.post("/posts/:postId/comments", commentController.createComment);

// PUT /api/posts/:postId/comments/:commentId
router.put(
  "/posts/:postId/comments/:commentId",
  commentController.updateComment
);

// DELETE /api/posts/:postId/comments/:commentId
router.delete(
  "/posts/:postId/comments/:commentId",
  commentController.deleteComment
);

module.exports = router;
