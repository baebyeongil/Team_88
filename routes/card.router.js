const express = require('express');
const router = express.Router();
const CardController = require('../controllers/card.controller');

const cardController = new CardController();

// router.post('/:columnId/card', cardController.postCard);
// router.put('/:columnId/card/:cardId', cardController.updateCard);
// router.delete('/:columnId/card/:cardId', cardController.deleteCard);
// router.patch('/:columnId/card/:cardId/state', cardController.stateCard);
// router.patch('/:columnId/card/:cardId/index', cardController.moveCard);

module.exports = router;
