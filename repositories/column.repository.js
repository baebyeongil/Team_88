const Column = require('../db/models/column');
const { Sequelize } = require('sequelize');

class ColumnRepository {
  postColumn = async (boardId, title, columnIndex) => {
    const column = await Column.create({
      boardId,
      title,
      columnIndex,
    });
    return column;
  };

  findLastColumn = async boardId => {
    const lastColumn = await Column.max('columnIndex', {
      where: { boardId },
    });
    return lastColumn;
  };

  findAllColumn = async boardId => {
    const columnIndex = await Column.findAll(
      {
        attributes: ['columnIndex'],
      },
      { where: { boardId } }
    );
    return columnIndex;
  };

  findOneColumn = async columnId => {
    const column = await Column.findOne({
      where: { id: columnId },
    });
    return column;
  };

  updateColumn = async (columnId, title) => {
    const column = await Column.update(
      {
        title,
      },
      { where: { id: columnId } }
    );
    return column;
  };

  deleteColumn = async columnId => {
    const column = await Column.destroy({ where: { id: columnId } });
    return column;
  };

  moveColumn = async (columnId, columnIndex) => {
    const column = await Column.update(
      { columnIndex },
      { where: { id: columnId } }
    );
    return column;
  };
}

module.exports = ColumnRepository;
