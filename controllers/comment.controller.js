const CommentService = require('../services/comment.service');

class CommentController {
  commentService = new CommentService();

  getComments = async (req, res, next) => {
    try {
      const { cardId } = req.params;

      const getCommentData = await this.commentService.getComments(cardId);

      return res
        .status(getCommentData.status)
        .json({ result: getCommentData.message });
    } catch (error) {
      return {
        status: 400,
        message: 'Controller Error: 불러오기에 실패했습니다.',
      };
    }
  };

  postComment = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { cardId } = req.params;
      const { comment } = req.body;

      if (comment == '') {
        return res.status(400).json({ result: '댓글 내용을 작성해 주세요.' });
      }

      const postCommentData = await this.commentService.postComment(
        userId,
        cardId,
        comment
      );

      return res
        .status(postCommentData.status)
        .json({ result: postCommentData.message });
    } catch (error) {
      return { status: 400, message: 'Controller Error: 등록에 실패했습니다.' };
    }
  };

  updateComment = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { commentId } = req.params;
      const { comment } = req.body;

      if (comment == '') {
        return res.status(400).json({ result: '댓글 내용을 작성해 주세요.' });
      }

      const updateCommentData = await this.commentService.updateComment(
        userId,
        commentId,
        comment
      );

      return res
        .status(updateCommentData.status)
        .json({ result: updateCommentData.message });
    } catch (error) {
      return { status: 400, message: 'Controller Error: 수정에 실패했습니다.' };
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { commentId } = req.params;

      const deleteCommentData = await this.commentService.deleteComment(
        userId,
        commentId
      );

      return res
        .status(deleteCommentData.status)
        .json({ result: deleteCommentData.message });
    } catch (error) {
      return { status: 400, message: 'Controller Error: 삭제에 실패했습니다.' };
    }
  };
}

module.exports = CommentController;
