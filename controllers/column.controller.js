const ColumnService = require('../services/column.service');

class ColumnController {
  columnService = new ColumnService();

  postColumn = async (req, res) => {
    const { boardId } = req.params;
    const { title, color } = req.body;
    const user = res.locals.user;

    const result = await this.columnService.postColumn(
      boardId,
      title,
      user,
      color
    );
    return res.status(result.status).json(result.message);
  };

  updateColumn = async (req, res) => {
    const { boardId, columnId } = req.params;
    const { title, color } = req.body;
    const user = res.locals.user;

    const result = await this.columnService.updateColumn(
      boardId,
      columnId,
      title,
      user,
      color
    );
    return res.status(result.status).json(result.message);
  };

  deleteColumn = async (req, res) => {
    const { boardId, columnId } = req.params;
    const user = res.locals.user;

    const result = await this.columnService.deleteColumn(
      boardId,
      columnId,
      user
    );
    return res.status(result.status).json(result.message);
  };

  moveColumn = async (req, res) => {
    const { boardId, columnId } = req.params;
    const { number } = req.body;
    const user = res.locals.user;
    const result = await this.columnService.moveColumn(
      boardId,
      columnId,
      number,
      user
    );
    return res.status(result.status).json(result.message);
  };
}

module.exports = ColumnController;
