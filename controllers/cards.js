const Card = require ("../models/card.js");

const getCard = async (req, res) => {
  const cards = await Card.find({});
  res.status(200).send(cards);
}

module.exports = {
  getCard
};