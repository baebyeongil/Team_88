const Card = require('../db/models/card');
const CheckList = require('../db/models/checkList');
const User = require('../db/models/user');

class CardRepository {
  getCard = async cardId => {
    try {
      const getCardData = await Card.findOne({
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

  findUser = async email => {
    try {
      const findUserData = await User.findOne({ where: { email } });

      return findUserData;
    } catch (error) {
      throw error;
    }
  };

  postCard = async (
    userId,
    columnId,
    title,
    content,
    worker,
    deadLine,
    cardIndex,
    color
  ) => {
    try {
      worker = String(worker);
      const postCardData = await Card.create({
        userId,
        columnId,
        title,
        content,
        worker,
        deadLine,
        cardIndex,
        color,
      });

      return postCardData;
    } catch (error) {
      throw error;
    }
  };

  updateCard = async (cardId, title, content, worker, deadLine) => {
    try {
      const updateCard = await Card.update(
        { title, content, worker, deadLine },
        { where: { id: cardId } }
      );

      return updateCard;
    } catch (error) {
      throw error;
    }
  };

  deleteCard = async cardId => {
    try {
      const deleteCard = await Card.destroy({ where: { id: cardId } });

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

  resetIndexCard = async cardData => {
    try {
      const resetIndexCardData = await Card.bulkCreate(cardData, {
        updateOnDuplicate: ['cardIndex'],
      });

      return resetIndexCardData;
    } catch (error) {
      throw error;
    }
  };

  createCheckList = async (cardId, content) => {
    try {
      const checkList = await CheckList.create({
        cardId,
        content,
      });
      return checkList;
    } catch (error) {
      throw error;
    }
  };

  getCheckList = async cardId => {
    try {
      const presentCard = await CheckList.findAll({ where: { cardId } });
      return presentCard;
    } catch (error) {
      throw error;
    }
  };

  updateCheckList = async (checkListId, isSuccess) => {
    try {
      return await CheckList.update(
        { isSuccess },
        { where: { id: checkListId } }
      );
    } catch (error) {
      throw error;
    }
  };
  deleteCheckList = async checkListId => {
    try {
      const existcheckList = await CheckList.findByPk(checkListId);
      if (!existcheckList) {
        return {
          status: 400,
        };
      }
      return await CheckList.destroy({ where: { id: checkListId } });
    } catch (error) {
      throw error;
    }
  };
  editCheckList = async (checkListId, content) => {
    try {
      const existcheckList = await CheckList.findByPk(checkListId);
      if (!existcheckList) {
        return {
          status: 400,
        };
      }
      return await CheckList.update(
        { content },
        { where: { id: checkListId } }
      );
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CardRepository;
