const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const CommentController = require('../controllers/comment.controller');

const commentController = new CommentController();

router.get('/:cardId/comment', commentController.getComments);
router.post('/:cardId/comment', auth, commentController.postComment);
router.put(
  '/:cardId/comment/:commentId',
  auth,
  commentController.updateComment
);
router.delete(
  '/:cardId/comment/:commentId',
  auth,
  commentController.deleteComment
);

module.exports = router;
