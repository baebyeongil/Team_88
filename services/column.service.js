const ColumnRepository = require('../repositories/column.repository');
const BoardRepository = require('../repositories/board.repository');
const ColumnIndexRepository = require('../services/colunmIndex.service');

class ColumnService {
  columnRepository = new ColumnRepository();
  boardRepository = new BoardRepository();
  columnIndexRepository = new ColumnIndexRepository();

  postColumn = async (boardId, title, user, color) => {
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
        columnIndex,
        color
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

  updateColumn = async (boardId, columnId, title, user, color) => {
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
        columnId,
        title,
        color
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
      let columnIndex = 10000000;
      let preIndex = 0;
      let aftIndex = 0;
      let columnDatas = [];

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

      let targetIndex = columnData.findIndex(e => e.id == columnId);

      // 제일 앞으로
      if (number === 0) {
        preIndex = 0;
        aftIndex = columnData[number].columnIndex;
      }
      // 제일 뒤로
      else if (number + 1 >= columnData.length) {
        preIndex = columnData[number].columnIndex;
        aftIndex = columnData[number].columnIndex + 20000000;
      }
      // 현재 위치 동일
      else if (number === targetIndex) {
        return {
          status: 200,
          message: '컬럼 이동 성공',
        };
      }
      // 현재 위치보다 뒤로
      else if (number > targetIndex) {
        preIndex = columnData[number].columnIndex;
        aftIndex = columnData[number + 1].columnIndex;
      }
      // 현재 위치보다 앞으로
      else if (number < targetIndex) {
        preIndex = columnData[number - 1].columnIndex;
        aftIndex = columnData[number].columnIndex;
      } else if (!columnData) {
        columnIndex = 10000000;
      }
      columnIndex = Math.floor((preIndex + aftIndex) / 2);

      if (columnIndex === preIndex || columnIndex === aftIndex) {
        for (let i = 0; i < columnData.length; i++) {
          let data = {
            id: columnData[i].id,
            columnIndex: 10000000 * (i + 1),
          };
          columnDatas.push(data);
        }
        await this.columnRepository.resetIndexColumn(columnDatas);
        columnDatas = [];

        // 제일 앞으로
        if (number === 0) {
          preIndex = 0;
          aftIndex = 10000000;
        }
        // 현재 위치 동일
        else if (number === targetIndex) {
          return {
            status: 200,
            message: '컬럼 이동 성공',
          };
        }
        // 현재 위치보다 뒤로
        else if (number > targetIndex) {
          preIndex = (number + 1) * 10000000;
          aftIndex = (number + 2) * 10000000;
        }
        // 현재 위치보다 앞으로
        else if (number < targetIndex) {
          preIndex = number * 10000000;
          aftIndex = (number + 1) * 10000000;
        }

        columnIndex = Math.floor((preIndex + aftIndex) / 2);
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
