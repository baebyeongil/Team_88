const CommentRepository = require('../repositories/comment.repository');

class CommentService {
  commentRepository = new CommentRepository();
}

module.exports = CommentService;
