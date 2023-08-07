const express = require('express');
const router = express.Router();
const ColumnController = require('../controllers/column.controller');

const columnController = new ColumnController();

// router.post('/:boardId/column', columnController.postColumn);
// router.put('/:boardId/column/:columnId', columnController.updateColumn);
// router.delete('/:boardId/column/:columnId', columnController.deleteColumn);
// router.patch('board/:boardId/column/:columnId', columnController.moveColumn);

module.exports = router;
