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
      const userId = res.locals.user.id;
      const { columnId } = req.params;
      const { title, content, email, deadLine, color } = req.body;

      if (title == '') {
        return res.status(400).json({ result: '제목을 작성해 주세요.' });
      }

      if (content == '') {
        return res.status(400).json({ result: '내용을 작성해 주세요.' });
      }

      if (email == '') {
        return res.status(400).json({ result: '작업자를 지정해 주세요.' });
      }

      if (deadLine == '') {
        return res.status(400).json({ result: '마감기한을 설정해 주세요.' });
      }

      const postCardData = await this.cardService.postCard(
        userId,
        columnId,
        title,
        content,
        email,
        deadLine,
        color
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
      const userId = res.locals.user.id;
      const { cardId } = req.params;
      const { title, content, email, deadLine } = req.body;

      const updateCardData = await this.cardService.updateCard(
        userId,
        cardId,
        title,
        content,
        email,
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
      const userId = res.locals.user.id;
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
      console.log(columnId);
      console.log(cardId);
      console.log(number);

      const moveCardData = await this.cardService.moveCard(
        columnId,
        cardId,
        number
      );

      return res
        .status(moveCardData.status)
        .json({ result: moveCardData.message });
    } catch (error) {
      return { status: 400, message: 'Controller Error: 수정에 실패했습니다.' };
    }
  };

  createCheckList = async (req, res, next) => {
    try {
      const { cardId } = req.params;
      const { content } = req.body;

      const createCheckList = await this.cardService.createCheckList(
        cardId,
        content
      );

      return res
        .status(createCheckList.status)
        .json({ result: createCheckList.message });
    } catch (error) {
      return {
        status: 400,
        message: 'Controller Error: checkList 생성에 실패했습니다.',
      };
    }
  };

  getCheckList = async (req, res, next) => {
    try {
      const { cardId } = req.params;
      const getCheckList = await this.cardService.getCheckList(cardId);

      return res
        .status(getCheckList.status)
        .json({ result: getCheckList.message });
    } catch (error) {
      return {
        status: 400,
        message: 'Controller Error: checkList 불러오기에 실패했습니다.',
      };
    }
  };

  updateCheckList = async (req, res, next) => {
    try {
      const { checkListId, isSuccess } = req.body;
      const updateCheckList = await this.cardService.updateCheckList(
        checkListId,
        isSuccess
      );

      return res
        .status(updateCheckList.status)
        .json({ result: updateCheckList.message });
    } catch (error) {
      return {
        status: 400,
        message: 'Controller Error: checkList 불러오기에 실패했습니다.',
      };
    }
  };
  deleteCheckList = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { checkListId } = req.body;
      const deleteCheckList = await this.cardService.deleteCheckList(
        userId,
        checkListId
      );

      return res
        .status(deleteCheckList.status)
        .json({ result: deleteCheckList.message });
    } catch (error) {
      return {
        status: 400,
        message: 'Controller Error: checkList 삭제에 실패했습니다.',
      };
    }
  };

  editCheckList = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { checkListId,content } = req.body;
      const editCheckList = await this.cardService.editCheckList(
        userId,
        checkListId,
        content
      );
      return res
        .status(editCheckList.status)
        .json({ result: editCheckList.message });
    } catch {
      return {
        status: 400,
        message: 'Controller Error: checkList 수정에 실패했습니다.',
      };
    }
  };
}

module.exports = CardController;
