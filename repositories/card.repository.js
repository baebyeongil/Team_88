const { where } = require('sequelize');
const Card = require('../db/models/card');

class CardRepository {
  getCard = async cardId => {
    try {
      const getCardData = await Card.findOne({
        order: [['cardIndex']],
        where: { id: cardId },
      });

      return getCardData;
    } catch (error) {
      throw error;
    }
  };

  findCard = async columnId => {
    try {
      const findCardData = await Card.findAll({
        order: [['cardIndex']],
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
    cardIndex
  ) => {
    try {
      const postCardData = await Card.create({
        userId,
        columnId,
        title,
        content,
        workerId,
        deadLine,
        cardIndex,
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
      const deleteCard = await Card.destroy({ where: { id: cardId, userId } });

      return deleteCard;
    } catch (error) {
      throw error;
    }
  };

  stateCard = async (columnId, cardId, cardIndex) => {
    try {
      const stateCardData = await Card.update(
        { columnId, cardIndex },
        { where: { id: cardId } }
      );

      return stateCardData;
    } catch (error) {
      throw error;
    }
  };

  moveCard = async (cardId, cardIndex) => {
    try {
      const moveCardData = await Card.update(
        { cardIndex },
        { where: { id: cardId } }
      );

      return moveCardData;
    } catch (error) {
      throw error;
    }
  };

  resetIndexCard = async (cardData, columnId) => {
    console.log(cardData, '으아아아악');
    try {
      const resetIndexCardData = await Card.bulkCreate(cardData, {
        updateOnDuplicate: ['cardIndex'],
        where: { columnId },
      });

      return resetIndexCardData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

module.exports = CardRepository;
