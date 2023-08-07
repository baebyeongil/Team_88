const CommentService = require('../services/comment.service');

class CommentController {
  commentService = new CommentService();
}

module.exports = CommentController;
