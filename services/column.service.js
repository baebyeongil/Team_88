const ColumnRepository = require('../repositories/column.repository');

class ColumnService {
  columnRepository = new ColumnRepository();
}

module.exports = ColumnService;
