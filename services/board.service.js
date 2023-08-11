const BoardRepository = require('../repositories/board.repository');
const User = require('../db/models/user');
const Board = require('../db/models/board');
const Member = require('../db/models/member');
const bcrypt = require('bcrypt');
class BoardService {
  boardRepository = new BoardRepository();

  //보드생성
  createBoard = async (user, title, content) => {
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
    if (!getBoard) {
      return {
        status: 400,
        message:
          '등록된 보드가 없습니다, 보드를 생성하거나 초대받을 수 있습니다.',
      };
    }

    return {
      status: 200,
      getBoard,
    };
  };

  //보드삭제
  deleteBoard = async (user, boardId, password) => {
    if (!user) {
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
  //보드초대하기
  inviteBoard = async (email, boardId) => {
    if (!email) {
      return {
        status: 400,
        message: '이메일을 입력해야합니다.',
      };
    }

    const invitedUser = await User.findOne({
      where: { email },
    });

    if (!invitedUser) {
      return {
        status: 400,
        message: '해당 유저는 존재하지 않습니다.',
      };
    }

    const existBoard = await Board.findOne({
      where: { id: boardId },
    });

    if (!existBoard) {
      return {
        status: 400,
        message: '해당 보드는 존재하지 않습니다.',
      };
    }

    const existUser = await Member.findOne({
      where: { boardId, userId: invitedUser.id },
    });
    if (existUser) {
      return {
        status: 400,
        message: '이미 초대된 유저입니다.',
      };
    }

    return await this.boardRepository.inviteBoard(invitedUser.id, boardId);
  };
}

module.exports = BoardService;
