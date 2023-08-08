const BoardService = require('../services/board.service');

class BoardController {
  boardService = new BoardService();

  //보드생성
  createBoard = async (req, res) => {
    const user = res.locals.user;
    const { title, content } = req.body;
    const createBoard = await this.boardService.createBoard(
      user,
      title,
      content
    );
    return res.status(createBoard.status).json(createBoard.message);
  };

  //내보드목록불러오기
  getBoardList = async (req, res) => {
    const user = res.locals.user;
    const getBoardList = await this.boardService.getBoardList(user);
    if (getBoardList.status == 400) {
      return res.status(getBoardList.status).json(getBoardList.message);
    } else {
      return res.status(getBoardList.status).json(getBoardList.boardList);
    }
  };

  //보드수정하기
  updateBoard = async (req, res) => {
    const user = res.locals.user;
    const { boardId } = req.params;
    const { title, content } = req.body;
    const updateBoard = await this.boardService.updateBoard(
      user,
      title,
      content,
      boardId
    );
    return res.status(updateBoard.status).json(updateBoard.message);
  };

  //보드불러오기
  getBoard = async (req, res) => {
    const user = res.locals.user;
    const { boardId } = req.params;
    const getBoard = await this.boardService.getBoard(user, boardId);
    if (getBoard.status == 400) {
      return res.status(getBoard.status).json(getBoard.message);
    } else {
      return res.status(getBoard.status).json(getBoard.getBoard);
    }
  };

  //보드삭제
  deleteBoard = async (req, res) => {
    const user = res.locals.user;
    const { boardId } = req.params;
    const { password } = req.body;
    const deleteBoard = await this.boardService.deleteBoard(
      user,
      boardId,
      password
    );
    if (deleteBoard.status == 400) {
      return res.status(deleteBoard.status).json(deleteBoard.message);
    } else {
      return res.status(deleteBoard.status).json(deleteBoard.message);
    }
  };

  //보드초대하기
  inviteBoard = async (req, res) => {
    const { boardId } = req.params;
    const { email } = req.body;
    const inviteBoard = await this.boardService.inviteBoard(email, boardId);
    return res.status(inviteBoard.status).json(inviteBoard.message);
  };
}

module.exports = BoardController;
