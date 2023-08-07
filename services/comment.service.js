const CommentRepository = require('../repositories/comment.repository');

class CommentService {
  commentRepository = new CommentRepository();

  getComments = async cardId => {
    try {
      const getCommentData = await this.commentRepository.getComments(cardId);

      return { status: 200, message: getCommentData };
    } catch (error) {
      return { status: 400, message: 'Repository ' };
    }
  };

  postComment = async (userId, cardId, comment) => {
    try {
      await this.commentRepository.postComment(userId, cardId, comment);

      return { status: 200, message: '등록이 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: 'Repository Error: 등록에 실패했습니다.' };
    }
  };

  updateComment = async (userId, commentId, comment) => {
    try {
      const updateCommentData = await this.commentRepository.postComment(
        userId,
        commentId,
        comment
      );
      if (!updateCommentData) {
        return { status: 403, message: 'Service Error: 수정 권한이 없습니다.' };
      }

      return { status: 200, message: '수정이 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: 'Repository Error: 수정에 실패했습니다.' };
    }
  };

  deleteComment = async (userId, commentId) => {
    try {
      const deleteCommentData = await this.commentRepository.postComment(
        userId,
        commentId
      );
      if (!deleteCommentData) {
        return { status: 403, message: 'Service Error: 삭제 권한이 없습니다.' };
      }

      return { status: 200, message: '삭제가 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: 'Repository Error: 삭제에 실패했습니다.' };
    }
  };
}

module.exports = CommentService;
