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

cardsRouters.get('/cards', getCard);

cardsRouters.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      // eslint-disable-next-line no-useless-escape
      .regex(/((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/),
  }),
}), createCard);

cardsRouters.delete('/cards/:_id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

cardsRouters.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);

cardsRouters.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = { cardsRouters };
