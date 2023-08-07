const CardService = require('../services/card.service');

class CardController {
  cardService = new CardService();

  getCard = async (req, res, next) => {
    try {
      const { cardId } = req.params;

      const getCardData = await this.cardService.getCard(cardId);

      return res
        .status(getCardData.status)
        .json({ result: getCardData.message });
    } catch (error) {
      return {
        status: 400,
        message: 'Controller Error: 불러오기에 실패했습니다.',
      };
    }
  };

  postCard = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const { columnId } = req.params;
      const { title, content, workerId, deadLine } = req.body;
      const postCardData = await this.cardService.postCard(
        userId,
        columnId,
        title,
        content,
        workerId,
        deadLine
      );

      return res
        .status(postCardData.status)
        .json({ result: postCardData.message });
    } catch (error) {
      return { status: 400, message: 'Controller Error: 등록에 실패했습니다.' };
    }
  };

  updateCard = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const { cardId } = req.params;
      const { title, content, workerId, deadLine } = req.body;

      const updateCardData = await this.cardService.updateCard(
        userId,
        cardId,
        title,
        content,
        workerId,
        deadLine
      );

      return res
        .status(updateCardData.status)
        .json({ result: updateCardData.message });
    } catch (error) {
      return { status: 400, message: 'Controller Error: 수정에 실패했습니다.' };
    }
  };

  deleteCard = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const { cardId } = req.params;

      const deleteCardData = await this.cardService.deleteCard(userId, cardId);

      return res
        .status(deleteCardData.status)
        .json({ result: deleteCardData.message });
    } catch (error) {
      return { status: 400, message: 'Controller Error: 삭제에 실패했습니다.' };
    }
  };

  stateCard = async (req, res, next) => {
    try {
      const { cardId } = req.params;
      const { columnId } = req.body;

      const stateCardData = await this.cardService.stateCard(columnId, cardId);

      return res
        .status(stateCardData.status)
        .json({ result: stateCardData.message });
    } catch (error) {
      return { status: 400, message: 'Controller Error: 수정에 실패했습니다.' };
    }
  };

  moveCard = async (req, res, next) => {
    try {
      const { columnId, cardId } = req.params;
      const { number } = req.body;

      const moveCardData = await this.cardService.moveCard(
        columnId,
        cardId,
        number
      );
    } catch (error) {
      return { status: 400, message: 'Controller Error: 수정에 실패했습니다.' };
    }
  };
}

module.exports = CardController;
