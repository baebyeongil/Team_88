const ColumnRepository = require('../repositories/column.repository');
const BoardRepository = require('../repositories/board.repository');
const ColumnIndexRepository = require('../services/colunmIndex.service');

class ColumnService {
  columnRepository = new ColumnRepository();
  boardRepository = new BoardRepository();
  columnIndexRepository = new ColumnIndexRepository();

  postColumn = async (boardId, title, user) => {
    try {
      let columnIndex = 0;
      if (!boardId) {
        return {
          status: 400,
          message: '보드 아이디 값이 입력되지 않았습니다.',
        };
      } else if (!title) {
        return {
          status: 400,
          message: '타이틀이 입력되지 않았습니다.',
        };
      }
      const board = await this.boardRepository.getBoard(user, boardId);
      if (board.status === 400) {
        return {
          status: 400,
          message: '존재하지 않는 보드입니다.',
        };
      }
      const lastColumn = await this.columnRepository.findLastColumn(boardId);

      if (lastColumn) {
        columnIndex = await this.columnIndexRepository.index(lastColumn);
      } else if (!lastColumn) {
        columnIndex = 10000000;
      }
      const createColumn = await this.columnRepository.postColumn(
        boardId,
        title,
        columnIndex
      );
      if (!createColumn) {
        return {
          status: 400,
          message: '컬럼 생성 실패',
        };
      }
      return {
        status: 200,
        message: '컬럼 생성 성공',
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  updateColumn = async (boardId, columnId, title, user) => {
    try {
      if (!boardId) {
        return {
          status: 400,
          message: '보드 아이디 값이 입력되지 않았습니다.',
        };
      } else if (!columnId) {
        return {
          status: 400,
          message: '컬럼 아이디 값이 입력되지 않았습니다.',
        };
      } else if (!title) {
        return {
          status: 400,
          message: '타이틀이 입력되지 않았습니다.',
        };
      }
      const board = await this.boardRepository.getBoard(user, boardId);
      if (board.status === 400) {
        return {
          status: 400,
          message: '존재하지 않는 보드입니다.',
        };
      }
      const column = await this.columnRepository.findOneColumn(columnId);
      if (!column) {
        return {
          status: 400,
          message: '존재하지 않는 컬럼입니다.',
        };
      }
      const updatecolumn = await this.columnRepository.updateColumn(
        boardId,
        columnId,
        title
      );
      if (!updatecolumn) {
        return {
          status: 400,
          message: '컬럼 수정 실패',
        };
      }
      return {
        status: 200,
        message: '컬럼 수정 성공',
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  deleteColumn = async (boardId, columnId, user) => {
    try {
      if (!boardId) {
        return {
          status: 400,
          message: '보드 아이디 값이 입력되지 않았습니다.',
        };
      } else if (!columnId) {
        return {
          status: 400,
          message: '컬럼 아이디 값이 입력되지 않았습니다.',
        };
      }
      const board = await this.boardRepository.getBoard(user, boardId);
      if (board.status === 400) {
        return {
          status: 400,
          message: '존재하지 않는 보드입니다.',
        };
      }
      const column = await this.columnRepository.findOneColumn(columnId);
      if (!column) {
        return {
          status: 400,
          message: '존재하지 않는 컬럼입니다.',
        };
      }
      const deleteColumn = await this.columnRepository.deleteColumn(columnId);
      if (!deleteColumn) {
        return {
          status: 400,
          message: '컬럼 삭제 실패',
        };
      }
      return {
        status: 200,
        message: '컬럼 삭제 성공',
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  moveColumn = async (boardId, columnId, number, user) => {
    try {
      let columnIndex = 0;

      if (!boardId) {
        return {
          status: 400,
          message: '보드 아이디 값이 입력되지 않았습니다.',
        };
      } else if (!columnId) {
        return {
          status: 400,
          message: '컬럼 아이디 값이 입력되지 않았습니다.',
        };
      } else if (number === undefined) {
        return {
          status: 400,
          message: '변경 할 위치가 입력되지 않았습니다.',
        };
      }
      const board = await this.boardRepository.getBoard(user, boardId);
      if (board.status === 400) {
        return {
          status: 400,
          message: '존재하지 않는 보드입니다.',
        };
      }
      const column = await this.columnRepository.findOneColumn(columnId);
      if (!column) {
        return {
          status: 400,
          message: '존재하지 않는 컬럼입니다.',
        };
      }
      const columnData = await this.columnRepository.findAllColumn(boardId);
      if (number === 0) {
        columnIndex = columnData[number].columnIndex - 1;
      } else if (number + 1 >= columnData.length) {
        columnIndex = (await this.columnRepository.findLastColumn(boardId)) + 1;
      } else if (columnData) {
        const preIndex = columnData[number - 1].columnIndex;
        const aftIndex = columnData[number].columnIndex;
        columnIndex = (preIndex + aftIndex) / 2;
      } else if (!columnData) {
        columnIndex = 10000000;
      }

      const moveColumn = await this.columnRepository.moveColumn(
        columnId,
        columnIndex
      );
      if (!moveColumn) {
        return {
          status: 400,
          message: '컬럼 이동 실패',
        };
      }
      return {
        status: 200,
        message: '컬럼 이동 성공',
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };
}

module.exports = ColumnService;
