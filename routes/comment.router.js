const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');

const commentController = new CommentController();

router.get('/:cardId/comment', commentController.getComment);
router.post('/:cardId/comment', commentController.postComment);
router.put('/:cardId/comment/:commentId', commentController.updateComment);
router.delete('/:cardId/comment/:commentId', commentController.deleteComment);

module.exports = router;
