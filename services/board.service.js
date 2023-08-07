const BoardRepository = require('../repositories/board.repository');

class BoardService {
  boardRepository = new BoardRepository();
}

module.exports = BoardService;
