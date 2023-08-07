const router = require('express').Router();
const auth = require('../middleware/auth.js');
const BoardController = require('../controllers/board.controller');
const boardController = new BoardController();


router.post('/',auth, boardController.createBoard);
router.get('/',auth, boardController.getBoard);
router.put('/:boardId',auth, boardController.updateBoard);
// router.delete('/:boardId', boardController.deleteBoard);
// router.post('/:boardId/member', boardController.invateBoard);

module.exports = router;
