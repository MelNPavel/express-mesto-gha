const express = require('express');
const { celebrate, Joi } = require('celebrate');

const cardsRouters = express.Router();
const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouters.get('/cards', express.json(), getCard);
cardsRouters.post('/cards', express.json(), createCard);
cardsRouters.delete('/cards/:_id', express.json(), deleteCard);
cardsRouters.put('/cards/:cardId/likes', express.json(), likeCard);
cardsRouters.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string(),
  }),
}), dislikeCard);
module.exports = { cardsRouters };
