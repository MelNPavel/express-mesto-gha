const express = require("express");
const cardsRouters = express.Router();
const { getCard } = require("../controllers/cards.js");

cardsRouters.get ("/cards", express.json(), getCard);

module.exports = { cardsRouters };