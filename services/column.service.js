const ColumnRepository = require('../repositories/column.repository');
const BoardRepository = require('../repositories/board.repository');
const ColumnIndexRepository = require('../services/colunmIndex.service');

class ColumnService {
  columnRepository = new ColumnRepository();
  boardRepository = new BoardRepository();
  columnIndexRepository = new ColumnIndexRepository();

  postColumn = async (boardId, title) => {
    try {
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
      // const board = await this.boardRepository.1개보드찾는함수
      // if (!board) {
      //   return {
      //     status: 400,
      //     message: '존재하지 않는 보드입니다.',
      //   };
      // }
      const lastColumn = await this.columnRepository.findLastColumn();
      if (!lastColumn) {
        console.log('test');
      }
      const index = await this.columnIndexRepository.index(lastColumn);
      const createColumn = await this.columnRepository.postColumn(title, index);
      if (!createColumn) {
        return {
          status: 400,
          message: '컬럼 생성에 실패하였습니다.',
        };
      }
      return {
        status: 200,
        message: column,
      };
    } catch (err) {
      console.log(err);
      return { status: 500, message: 'Server Error' };
    }
  };

  updateColumn = async (boardId, columnId, title) => {
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
      // const board = await this.boardRepository.1개보드찾는함수
      // if (!board) {
      //   return {
      //     status: 400,
      //     message: '존재하지 않는 보드입니다.',
      //   };
      // }
      const column = await this.columnRepository.findOneColimn(columnId);
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

  deleteColumn = async (boardId, columnId) => {
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
      // const board = await this.boardRepository.1개보드찾는함수
      // if (!board) {
      //   return {
      //     status: 400,
      //     message: '존재하지 않는 보드입니다.',
      //   };
      // }
      const column = await this.columnRepository.findOneColimn(columnId);
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

  moveColumn = async (boardId, columnId, title) => {
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
      // const board = await this.boardRepository.1개보드찾는함수
      // if (!board) {
      //   return {
      //     status: 400,
      //     message: '존재하지 않는 보드입니다.',
      //   };
      // }

      const column = await this.columnRepository.findOneColimn(columnId);
      if (!column) {
        return {
          status: 400,
          message: '존재하지 않는 컬럼입니다.',
        };
      }
      const columnIndex = await this.columnRepository.findAllColumn();
      if (!columnIndex) {
        console.log('test');
      }
      const index = await this.columnIndexRepository.index(lastColumn);
      const moveColumn = await this.columnRepository.moveColumn(
        boardId,
        columnId,
        title
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
