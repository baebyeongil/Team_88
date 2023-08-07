const Card = require('../db/models/card');

class CardRepository {
  getCards = async boardId => {
    try {
      const getCardsData = await Card.findAll({ where: { boardId } });

      return getCardsData;
    } catch (error) {
      throw error;
    }
  };

  findCard = async columnId => {
    try {
      const findCardData = await Card.findAll({
        attributes: ['index'],
        where: { columnId },
      });

      return findCardData;
    } catch (error) {
      throw error;
    }
  };

  postCard = async (
    userId,
    columnId,
    title,
    content,
    workerId,
    deadLine,
    index
  ) => {
    try {
      const postCardData = await Card.create({
        userId,
        columnId,
        title,
        content,
        workerId,
        deadLine,
        index,
      });

      return postCardData;
    } catch (error) {
      throw error;
    }
  };

  updateCard = async (userId, cardId, title, content, workerId, deadLine) => {
    try {
      const updateCard = await Card.update(
        { title, content, workerId, deadLine },
        { where: { id: cardId, userId } }
      );

      return updateCard;
    } catch (error) {
      throw error;
    }
  };

  deleteCard = async (userId, cardId) => {
    try {
      const deleteCard = await Card.delete({ where: { id: cardId, userId } });

      return deleteCard;
    } catch (error) {
      throw error;
    }
  };

  stateCard = async (columnId, cardId, index) => {
    try {
      const stateCardData = await Card.update(
        { columnId, index },
        { where: { cardId } }
      );

      return stateCardData;
    } catch (error) {
      throw error;
    }
  };

  moveCard = async (cardId, index) => {
    try {
      const moveCardData = await Card.update({ index }, { where: { cardId } });

      return moveCardData;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CardRepository;
