const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const CardController = require('../controllers/card.controller');

const cardController = new CardController();

router.get('/:columnId/card/:cardId', auth, cardController.getCard);
router.post('/:columnId/card', auth, cardController.postCard);
router.put('/:columnId/card/:cardId', auth, cardController.updateCard);
router.get('/:columnId/card/:cardId/checkList', auth, cardController.getCheckList);
router.put('/:columnId/card/:cardId/checkList', auth, cardController.createCheckList);
router.delete('/:columnId/card/:cardId', auth, cardController.deleteCard);
router.patch('/:columnId/card/:cardId/state', auth, cardController.stateCard);
router.patch('/:columnId/card/:cardId/index', auth, cardController.moveCard);

module.exports = router;
