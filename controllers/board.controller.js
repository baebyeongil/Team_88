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
  //보드불러오기
  getBoard = async (req, res) => {
    const user = res.locals.user;
    const getBoard = await this.boardService.getBoard(user);
    if (getBoard.status == 400) {
      return res.status(getBoard.status).json(getBoard.message);
    } else {
      return res.status(getBoard.status).json(getBoard.boardList);
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
}

module.exports = BoardController;
