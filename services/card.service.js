const { col } = require('sequelize');
const CardRepository = require('../repositories/card.repository');

class CardService {
  cardRepository = new CardRepository();

  getCard = async cardId => {
    try {
      const getCardData = await this.cardRepository.getCard(cardId);

      return { status: 200, message: getCardData };
    } catch (error) {
      return {
        status: 400,
        message: 'Repository Error: 불러오기에 실패했습니다.',
      };
    }
  };

  postCard = async (userId, columnId, title, content, workerId, deadLine) => {
    try {
      let index = 10000000;

      const findCardData = await this.cardRepository.findCard(columnId);
      if (findCardData.length) {
        index = findCardData[findCardData.length - 1].cardIndex + 10000000;
      }
      console.log(title);

      await this.cardRepository.postCard(
        userId,
        columnId,
        title,
        content,
        workerId,
        deadLine,
        index
      );

      return { status: 200, message: '등록이 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: 'Repository Error: 등록에 실패했습니다.' };
    }
  };

  updateCard = async (userId, cardId, title, content, workerId, deadLine) => {
    try {
      const updateCardData = await this.cardRepository.updateCard(
        userId,
        cardId,
        title,
        content,
        workerId,
        deadLine
      );

      if (!updateCardData) {
        return { status: 403, message: 'Service Error: 수정 권한이 없습니다.' };
      }

      return { status: 200, message: '수정이 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: 'Repository Error: 수정에 실패했습니다.' };
    }
  };

  deleteCard = async (userId, cardId) => {
    try {
      const deleteCardData = await this.cardRepository.deleteCard(
        userId,
        cardId
      );

      if (!deleteCardData) {
        return { status: 403, message: 'Service Error: 삭제 권한이 없습니다.' };
      }

      return { status: 200, message: '삭제가 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: 'Repository Error: 삭제에 실패했습니다.' };
    }
  };

  stateCard = async (columnId, cardId) => {
    try {
      let index = 10000000;
      const findCardData = await this.cardRepository.findCard(columnId);

      if (findCardData.length) {
        index = findCardData[findCardData.length - 1].cardIndex + 10000000;
      }

      await this.cardRepository.stateCard(columnId, cardId, index);

      return { status: 200, message: '수정이 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: 'Repository Error: 수정에 실패했습니다.' };
    }
  };

  moveCard = async (columnId, cardId, number) => {
    try {
      let index = 10000000;
      let preIndex = 0;
      let aftIndex = 0;
      let cardData = [];
      const findCardData = await this.cardRepository.findCard(columnId);
      let length = findCardData.length - 1;

      if (length) {
        let targetIndex = findCardData.findIndex(e => e.id == cardId);
        if (number == 0) {
          preIndex = 0;
          aftIndex = findCardData[number].cardIndex;
        } else if (number >= length) {
          preIndex = findCardData[length].cardIndex;
          aftIndex = preIndex + 20000000;
        } else {
          if (targetIndex > number) {
            preIndex = findCardData[number - 1].cardIndex;
            aftIndex = findCardData[number].cardIndex;
          } else {
            preIndex = findCardData[number].cardIndex;
            aftIndex = findCardData[number + 1].cardIndex;
          }
        }
        index = Math.floor((preIndex + aftIndex) / 2);

        if (index == preIndex || index == aftIndex) {
          for (let i = 0; i < findCardData.length; i++) {
            let data = {
              id: findCardData[i].id,
              cardIndex: 10000000 * (i + 1),
            };
            cardData.push(data);
          }
          await this.cardRepository.resetIndexCard(cardData, columnId);
          cardData = [];

          if (number == 0) {
            preIndex = 0;
            aftIndex = 10000000;
          } else if (number >= length) {
            preIndex = (number + 1) * 10000000;
            aftIndex = preIndex + 20000000;
          } else {
            if (targetIndex > number) {
              preIndex = number * 10000000;
              aftIndex = (number + 1) * 10000000;
            } else {
              preIndex = (number + 1) * 10000000;
              aftIndex = (number + 2) * 10000000;
            }
          }

          index = Math.floor((preIndex + aftIndex) / 2);
        }
      }

      await this.cardRepository.moveCard(cardId, index);

      return { status: 200, message: '수정이 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: 'Repository Error: 수정에 실패했습니다.' };
    }
  };
}

module.exports = CardService;
