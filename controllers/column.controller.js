const ColumnService = require('../services/column.service');

class ColumnController {
  columnService = new ColumnService();
}

module.exports = ColumnController;
