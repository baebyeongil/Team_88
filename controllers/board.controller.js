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
    if (getBoard.status == 400) {
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
}

module.exports = BoardController;
