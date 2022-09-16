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
cardsRouters.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).max(30),
  }),
}), createCard);
cardsRouters.delete('/cards/:_id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string(),
  }),
}), deleteCard);
cardsRouters.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string(),
  }),
}), likeCard);
cardsRouters.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string(),
  }),
}), dislikeCard);
module.exports = { cardsRouters };
