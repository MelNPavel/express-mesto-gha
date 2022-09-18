const Card = require('../models/card');

const BadRequest = require('../errors/BadRequest');
const NotFoudError = require('../errors/NotFoudError');
const InternalServerError = require('../errors/InternalServerError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCard = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (e) {
    return next(new InternalServerError('Ошибка в запросе'));
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const cards = await new Card({ name, link, owner }).save();
    if (!cards) {
      return next(new NotFoudError('Такой картоки нет'));
    }
    return res.status(200).send(cards);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

const deleteCard = async (req, res, next) => {
  const userId = req.user._id;
  const { _id } = req.params;
  try {
    const card = await Card.findById(_id);
    if (!card) {
      return next(new NotFoudError('Такой картоки нет'));
    }
    if (userId !== card.owner.toString()) {
      return next(new ForbiddenError('Карточка не принадлежит данному пользователю'));
    }
    const cards = await Card.findByIdAndDelete(_id);
    if (!cards) {
      return next(new NotFoudError('Такой картоки нет'));
    }
    return res.status(200).send(cards);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

const likeCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const like = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!like) {
      return next(new NotFoudError('Такой картоки нет'));
    }
    return res.status(200).send(like);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

const dislikeCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const disLike = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!disLike) {
      return next(new NotFoudError('Такой картоки нет'));
    }
    return res.status(200).send(disLike);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
