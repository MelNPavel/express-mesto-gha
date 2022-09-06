const User = require('../models/user');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка в запросе' });
  }
};

const userFindId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: 'Ошибка в запросе' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const userCreate = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(NOT_FOUND).send({ message: 'Такого пользователя нет' });
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: 'Ошибка в запросе' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const avatarUpdate = async (req, res) => {
  try {
    const { avatar } = req.body.avatar;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      avatar,
      { new: true, runValidators: true },
    );
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: 'Ошибка в запросе' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports = {
  getUsers,
  userFindId,
  userCreate,
  userUpdate,
  avatarUpdate,
};
