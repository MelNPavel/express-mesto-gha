require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequest = require('../errors/BadRequest');
const NotFoudError = require('../errors/NotFoudError');
const InternalServerError = require('../errors/InternalServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (e) {
    return new InternalServerError('Ошибка в запросе');
  }
};

const getUserMe = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoudError('Пользователь по указанному _id не найден.'));
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

const userFindId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoudError('Пользователь по указанному _id не найден.'));
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

const userCreate = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name,
      about,
      avatar,
      password: hashedPassword,
    });
    return (res.status(200).send(user));
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
    if (e.code === 11000) {
      return next(new ConflictError('Пользователь с такими данными уже существует'));
    }
  }
  return next(new InternalServerError('Произошла ошибка на сервере'));
};

const userUpdate = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoudError('Такого пользователя нет'));
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
  }
  return next(new InternalServerError('Произошла ошибка на сервере'));
};

const avatarUpdate = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email }).select('+password');
    if (!checkUser) {
      return next(new UnauthorizedError('Неправильный email или пароль'));
    }
    const passwordVal = await bcrypt.compare(password, checkUser.password);
    if (!passwordVal) {
      return next(new UnauthorizedError('Неправильный email или пароль'));
    }
    const token = jwt.sign({
      _id: checkUser.id,
    }, 'SECRET');
    res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: true,
    });
    return res.status(200).send(checkUser.toJSON());
  } catch (e) {
    return next(e);
  }
};

// process.env['JWT.SECRET'])

module.exports = {
  getUsers,
  userFindId,
  userCreate,
  userUpdate,
  avatarUpdate,
  login,
  getUserMe,
};
