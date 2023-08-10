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

  postCard = async (
    userId,
    columnId,
    title,
    content,
    email,
    deadLine,
    color
  ) => {
    try {
      let index = 10000000;

      const findCardData = await this.cardRepository.findCard(columnId);
      if (findCardData.length) {
        index = findCardData[findCardData.length - 1].cardIndex + 10000000;
      }

      const findUserData = await this.cardRepository.findUser(email);

      if (!findUserData) {
        return { status: 400, message: '존재하지 않는 유저입니다.' };
      }
      let worker = [findUserData.nickname, findUserData.email];

      await this.cardRepository.postCard(
        userId,
        columnId,
        title,
        content,
        worker,
        deadLine,
        index,
        color
      );

      return { status: 200, message: '등록이 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: 'Repository Error: 등록에 실패했습니다.' };
    }
  };

  updateCard = async (userId, cardId, title, content, email, deadLine) => {
    let workerId;
    try {
      const findCardData = await this.cardRepository.getCard(cardId);

      if (findCardData.userId != userId) {
        return { status: 403, message: 'Service Error: 수정 권한이 없습니다.' };
      }

      if (title == '') {
        title = findCardData.title;
      }

      if (content == '') {
        content = findCardData.content;
      }

      if (email == '') {
        workerId = findCardData.workerId;
      } else {
        const findUserData = await this.cardRepository.findUser(email);
        if (!findUserData) {
          return { status: 400, message: '존재하지 않는 유저입니다.' };
        }
        workerId = findUserData.id;
      }

      if (deadLine == '') {
        deadLine = findCardData.deadLine;
      }

      await this.cardRepository.updateCard(
        cardId,
        title,
        content,
        workerId,
        deadLine
      );

      return { status: 200, message: '수정이 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: 'Repository Error: 수정에 실패했습니다.' };
    }
  };

  deleteCard = async (userId, cardId) => {
    try {
      const findCardData = await this.cardRepository.getCard(cardId);

      if (findCardData.userId != userId) {
        return { status: 403, message: 'Service Error: 삭제 권한이 없습니다.' };
      }

      await this.cardRepository.deleteCard(cardId);

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
      console.log(error);
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
          await this.cardRepository.resetIndexCard(cardData);
          cardData = [];

          if (number == 0) {
            preIndex = 0;
            aftIndex = 10000000;
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

  createCheckList = async (cardId, content) => {
    if (!content) {
      return {
        status: 400,
        message: '체크리스트를 입력하셔야 생성이 가능합니다.',
      };
    }

    const presentCard = await this.cardRepository.createCheckList(
      cardId,
      content
    );

    if (!presentCard) {
      return {
        status: 400,
        message: '현재 존재하는 카드가 아닙니다.',
      };
    }

    return {
      status: 200,
      message: '체크리스트를 생성했습니다.',
    };
  };

  getCheckList = async cardId => {
    const presentCard = await this.cardRepository.getCheckList(cardId);
    if (!presentCard) {
      return {
        status: 400,
        message: '현재 존재하는 카드가 아닙니다.',
      };
    }
    return {
      status: 200,
      message: presentCard.checkList,
    };
  };
}

module.exports = CardService;
