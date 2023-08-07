const CardService = require('../services/card.service');

class CardController {
  cardService = new CardService();
}

module.exports = CardController;
