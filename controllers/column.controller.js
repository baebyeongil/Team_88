const ColumnService = require('../services/column.service');

class ColumnController {
  columnService = new ColumnService();

  postColumn = async (req, res) => {
    const { boardId } = req.params;
    const { title } = req.body;

    const result = await this.columnService.postColumn(boardId, title);
    return res.status(result.status).json(result.message);
  };

  updateColumn = async (req, res) => {
    const { boardId, columnId } = req.params;
    const { title } = req.body;

    const result = await this.columnService.updateColumn(
      boardId,
      columnId,
      title
    );
    return res.status(result.status).json(result.message);
  };

  deleteColumn = async (req, res) => {
    const { boardId, columnId } = req.params;

    const result = await this.columnService.deleteColumn(boardId, columnId);
    return res.status(result.status).json(result.message);
  };

  moveColumn = async (req, res) => {
    const { boardId, columnId } = req.params;
    const { number } = req.body;

    const result = await this.columnService.moveColumn(
      boardId,
      columnId,
      number
    );
    return res.status(result.status).json(result.message);
  };
}

module.exports = ColumnController;
