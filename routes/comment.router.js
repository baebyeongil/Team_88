const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');

const commentController = new CommentController();

// router.post('/card/:cardId/comment', commentController.creatComment);
// router.put('/card/:cardId/comment/:commentId', commentController.updateComment);
// router.delete(
//   '/card/:cardId/comment/:commentId',
//   commentController.deleteComment
// );

module.exports = router;
