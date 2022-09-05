const express = require("express");
const cardsRouters = express.Router();
const { getCard, createCard, deleteCard, likeCard, dislikeCard } = require("../controllers/cards.js");

cardsRouters.get ("/cards", express.json(), getCard);
cardsRouters.post ("/cards", express.json(), createCard);
cardsRouters.delete ("/cards/:_id", express.json(), deleteCard);
cardsRouters.put ("/cards/:cardId/likes", express.json(),  likeCard)
cardsRouters.delete ("/cards/:cardId/likes", express.json(), dislikeCard)
module.exports = { cardsRouters };