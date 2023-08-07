const CardRepository = require('../repositories/card.repository');

class CardService {
  cardRepository = new CardRepository();
}

module.exports = CardService;
