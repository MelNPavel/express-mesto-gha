const Card = require ("../models/card.js");

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const getCard = async (req, res) => {
  try{
      const cards = await Card.find({});
      res.status(200).send(cards);
  }catch(e) {
      return res.status(400).send({message: "Ошибка в запросе"})
  }
};

const createCard = async (req, res) => {
    try{
        const { name, link } = req.body;
        const owner = req.user._id;
        const cards = await new Card({name, link, owner}).save();
        res.status(200).send(cards);
    }catch(e) {
        if (e.name === 'ValidationError'){
            return res.status(BAD_REQUEST).send({message: "Ошибка в запросе"})}
            res.status(INTERNAL_SERVER_ERROR).send({message: "Произошла ошибка на сервере"})
    }

};

const deleteCard = async (req, res) => {
    try{
        const { _id } = req.params;
        const cards = await Card.findByIdAndDelete(_id);
        res.status(200).send(cards);
        if (!cards){
            return res.status(NOT_FOUND).send({message: "Такой картоки нет"})}
    }catch(e) {
        if (e.name === 'CastError'){
            return res.status(BAD_REQUEST).send({message: "Ошибка в запросе"})}
            res.status(INTERNAL_SERVER_ERROR).send({message: "Произошла ошибка на сервере"})
    }
};

const likeCard = async (req, res) => {
  try{
      const { cardId } = req.params;
      const like = await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
      )
      res.status(200).send(like);
      if (!like){
          return res.status(NOT_FOUND).send({message: "Такой картоки нет"})}
  }catch(e) {
      if (e.name === 'CastError'){
          return res.status(BAD_REQUEST).send({message: "Ошибка в запросе"})}
      res.status(INTERNAL_SERVER_ERROR).send({message: "Произошла ошибка на сервере"})
  }
};

const dislikeCard = async (req, res) => {
  try{
      const { cardId } = req.params;
      const disLike = await Card.findByIdAndUpdate(
          cardId,
          { $pull: { likes: req.user._id } },
          { new: true },
      )
      res.status(200).send(disLike);
      if (!disLike){
          return res.status(NOT_FOUND).send({message: "Такой картоки нет"})}
  }catch(e) {
        if (e.name === 'ReferenceError'){
            return res.status(BAD_REQUEST).send({message: "Ошибка в запросе"})}
        res.status(INTERNAL_SERVER_ERROR).send({message: "Произошла ошибка на сервере"})
  }

};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};