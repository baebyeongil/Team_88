const Comment = require('../db/models/comment');

class CommentRepository {
  getComments = async cardId => {
    try {
      const getComments = await Comment.findAll({ where: { cardId } });

      return getComments;
    } catch (error) {
      throw error;
    }
  };

  postComment = async (userId, cardId, comment) => {
    try {
      const postCommentData = await Comment.create({
        userId,
        cardId,
        comment,
      });

      return postCommentData;
    } catch (error) {
      throw error;
    }
  };

  updateComment = async (userId, commentId, comment) => {
    try {
      const updateCommentData = await Comment.update(
        { comment },
        { where: { id: commentId, userId } }
      );

      return updateCommentData;
    } catch (error) {
      throw error;
    }
  };

  deleteComment = async (userId, commentId) => {
    try {
      const deleteCommentData = await Comment.destroy({
        where: { id: commentId, userId },
      });

      return deleteCommentData;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommentRepository;
