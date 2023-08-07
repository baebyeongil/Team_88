const Column = require('../db/models/column');
const { Sequelize } = require('sequelize');

class ColumnRepository {
  postColumn = async (title, index) => {
    const column = await Column.create({
      title,
      index,
    });
    return column;
  };

  findLastColumn = async () => {
    const lastColumn = await Column.findAll({
      attributes: [Sequelize.fn('MAX', Sequelize.col('index'))],
    });
    return lastColumn;
  };

  findAllColumn = async () => {
    const columnIndex = await Column.findAll({
      attributes: ['index'],
    });
    return columnIndex;
  };

  findOneColumn = async columnId => {
    const column = await Column.findOne({
      where: { columnId },
    });
    return column;
  };

  updateColumn = async (columnId, title) => {
    const column = await Column.update(
      {
        title,
      },
      { where: { columnId } }
    );
    return column;
  };

  deleteColumn = async columnId => {
    const column = await Column.destory({ where: { columnId } });
    return column;
  };

  moveColumn = async columnId => {
    const column = await Column.update({ where: { columnId } });
    return column;
  };
}

module.exports = ColumnRepository;
