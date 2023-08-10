const Column = require('../db/models/column');
const { Sequelize } = require('sequelize');

class ColumnRepository {
  postColumn = async (boardId, title, columnIndex, color) => {
    const column = await Column.create({
      boardId,
      title,
      columnIndex,
      color,
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
      { where: { boardId }, order: [['columnIndex', 'ASC']] },
      {
        attributes: ['columnIndex'],
      }
    );

    return columnIndex;
  };

  findOneColumn = async columnId => {
    const column = await Column.findOne({
      where: { id: columnId },
    });
    return column;
  };

  updateColumn = async (columnId, title, color) => {
    const column = await Column.update(
      {
        title,
        color,
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

  resetIndexColumn = async columnDatas => {
    const resetIndexColumnData = await Column.bulkCreate(columnDatas, {
      updateOnDuplicate: ['columnIndex'],
    });
    return resetIndexColumnData;
  };
}

module.exports = ColumnRepository;
