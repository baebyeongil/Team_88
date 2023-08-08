const BoardRepository = require('../repositories/board.repository');
const Board = require('../db/models/board');
const bcrypt = require('bcrypt');
class BoardService {
  boardRepository = new BoardRepository();

  //보드생성
  createBoard = async (user, title, content) => {
    console.log('////////////////////////////////', user, title, content);
    if (!user) {
      return {
        status: 400,
        message: '로그인이 필요합니다.',
      };
    }

    if (!title) {
      return {
        status: 400,
        message: '프로젝트 타이틀이 필요합니다.',
      };
    }

    if (!content) {
      return {
        status: 400,
        message: '프로젝트에 대한 설명이 필요합니다.',
      };
    }

    return await this.boardRepository.createBoard(user, title, content);
  };

  //내보드목록불러오기
  getBoardList = async user => {
    if (!user) {
      return {
        status: 400,
        message: '로그인이 필요합니다.',
      };
    }
    const getBoard = await this.boardRepository.getBoardList(user);
    console.log(getBoard);
    if (!getBoard.boardList[0]) {
      return {
        status: 400,
        message:
          '등록된 보드가 없습니다, 보드를 생성하거나 초대받을 수 있습니다.',
      };
    }

    return await getBoard;
  };

  //보드수정하기
  updateBoard = async (user, title, content, boardId) => {
    if (!user) {
      return {
        status: 400,
        message: '로그인이 필요합니다.',
      };
    }

    const updateBoard = await this.boardRepository.updateBoard(user, boardId);

    if (!updateBoard) {
      return {
        status: 400,
        message: '보드 수정 권한이 없습니다.',
      };
    }

    let updateValues = {};
    if (title) updateValues.title = title;
    if (content) updateValues.content = content;

    await Board.update(updateValues, {
      where: { id: boardId },
    });

    return {
      status: 200,
      message: '보드를 수정 했습니다.',
    };
  };

  //보드불러오기
  getBoard = async (user, boardId) => {
    if (!user) {
      return {
        status: 400,
        message: '로그인이 필요합니다.',
      };
    }

    const getBoard = await this.boardRepository.getBoard(user, boardId);
    console.log(getBoard);
    if (!getBoard.getBoard[0]) {
      return {
        status: 400,
        message:
          '등록된 보드가 없습니다, 보드를 생성하거나 초대받을 수 있습니다.',
      };
    }

    return await getBoard;
  };
  deleteBoard = async (user, boardId, password) => {
    if(!user){
      return {
        status: 400,
        message: '로그인이 필요합니다.',
      };
    }
    

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return {
        status: 400,
        message: '비밀번호가 일치하지 않습니다.',
      };
    }

    const deleteBoard = await this.boardRepository.deleteBoard(user, boardId);

    if (!deleteBoard) {
      return {
        status: 400,
        message: '삭제 권한이 없습니다.',
      };
    }

    await deleteBoard.destroy();

    return {
      status: 200,
      message: '보드를 삭제했습니다.',
    };
  };
}

module.exports = BoardService;
