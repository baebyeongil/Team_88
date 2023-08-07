const express = require('express');
const router = express.Router();
const BoardController = require('../controllers/board.controller');

const boardController = new BoardController();

// router.post('/', boardController.postBoard);
// router.put('/:boardId', boardController.updateBoard);
// router.delete('/:boardId', boardController.deleteBoard);
// router.post('/:boardId/member', boardController.invateBoard);

module.exports = router;
