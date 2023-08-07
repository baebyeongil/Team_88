const express = require('express');
const router = express.Router();
const CardController = require('../controllers/card.controller');

const cardController = new CardController();

router.get('/:boardId/column/:columnId/card', cardController.getCards);
router.post('/:boardId/column/:columnId/card', cardController.postCard);
router.put(
  '/:boardId/column/:columnId/card/:cardId',
  cardController.updateCard
);
router.delete(
  '/:boardId/column/:columnId/card/:cardId',
  cardController.deleteCard
);
router.patch(
  '/:boardId/column/:columnId/card/:cardId/state',
  cardController.stateCard
);
router.patch(
  '/:boardId/column/:columnId/card/:cardId/index',
  cardController.moveCard
);

module.exports = router;
