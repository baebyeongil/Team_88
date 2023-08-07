const Board = require('../db/models/board');
const Member = require('../db/models/member');
const Column = require('../db/models/column');
const Card = require('../db/models/card');
class BoardRepository {
  //보드생성
  async createBoard(user, title, content) {
    try {
      const createdBoard = await Board.create({
        userId: user.id,
        title,
        content,
      });

      await Member.create({
        userId: user.id,
        boardId: createdBoard.id,
      });

      return {
        status: 200,
        message: '보드 생성에 성공했습니다.',
      };
    } catch (err) {
      console.error(err);
      return {
        status: 400,
        message: '보드 생성 도중 에러가 발생했습니다.',
      };
    }
  }

  //내보드목록불러오기
  async getBoardList(user) {
    try {
      const boardList = await Member.findAll({
        where: { userId: user.id },
        include: {
          model: Board,
          attributes: ['title', 'content'],
        },
      });

      return {
        status: 200,
        boardList,
      };
    } catch (err) {
      console.error(err);
      return {
        status: 400,
        message: '보드를 불렁오는 도중 에러가 발생했습니다.',
      };
    }
  }

  //보드수정하기
  async updateBoard(user, boardId) {
    try {
      const updateBoard = await Member.findOne({
        where: { userId: user.id, boardId: boardId },
      });

      return updateBoard;
    } catch (err) {
      console.error(err);
      return {
        status: 400,
        message: '보드를 수정하는 도중 에러가 발생했습니다.',
      };
    }
  }

  //보드불러오기
  async getBoard(user, boardId) {
    try {
      const getBoard = await Member.findOne({
        where: { userId: user.id, boardId: boardId },
        include: {
          model: Board,
          attributes: ['title', 'content'],
        },
        include: {
          model: Column,
          attributes: ['id', 'title'],
        },
        include: {
          model: Card,
          attributes: ['id', 'title', 'content', 'workerId', 'deadLine'],
        },
      });
      return getBoard;
    } catch (err) {
      console.error(err);
      return {
        status: 400,
        message: '보드를 수정하는 도중 에러가 발생했습니다.',
      };
    }
  }
}

module.exports = BoardRepository;
