const express = require('express');

const { celebrate, Joi } = require('celebrate');

const usersRouters = express.Router();
const {
  getUsers,
  userFindId,
  userUpdate,
  avatarUpdate,
  getUserMe,
} = require('../controllers/users');

usersRouters.get('/users', express.json(), getUsers);
usersRouters.get('/users/me', express.json(), getUserMe);
usersRouters.get('/users/:userId', express.json(), userFindId);

usersRouters.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
  }),
}), userUpdate);

usersRouters.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      // eslint-disable-next-line no-useless-escape
      .regex(/((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/),
  }),
}), avatarUpdate);

module.exports = { usersRouters };
