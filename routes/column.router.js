const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const ColumnController = require('../controllers/column.controller');

const columnController = new ColumnController();

router.post('/:boardId/column', auth, columnController.postColumn);
router.put('/:boardId/column/:columnId', auth, columnController.updateColumn);
router.delete(
  '/:boardId/column/:columnId',
  auth,
  columnController.deleteColumn
);
router.patch('/:boardId/column/:columnId', auth, columnController.moveColumn);

module.exports = router;
