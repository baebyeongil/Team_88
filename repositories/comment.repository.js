const Comment = require('../db/models/comment');
const User = require('../db/models/user');
class CommentRepository {
  findComment = async commentId => {
    try {
      const findCommentData = await Comment.findOne({
        where: { id: commentId },
      });

      return findCommentData;
    } catch (error) {
      throw error;
    }
  };
  getComments = async cardId => {
    try {
      const getComments = await Comment.findAll({
        include: {
          model: User,
          attributes: ['nickname'],
        },
        where: { cardId },
      });

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

  updateComment = async (commentId, comment) => {
    try {
      const updateCommentData = await Comment.update(
        { comment },
        { where: { id: commentId } }
      );

      return updateCommentData;
    } catch (error) {
      throw error;
    }
  };

  deleteComment = async commentId => {
    try {
      const deleteCommentData = await Comment.destroy({
        where: { id: commentId },
      });

      return deleteCommentData;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommentRepository;
