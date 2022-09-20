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

usersRouters.get('/users', getUsers);
usersRouters.get('/users/me', getUserMe);

usersRouters.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), userFindId);

usersRouters.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), userUpdate);

usersRouters.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      // eslint-disable-next-line no-useless-escape
      .regex(/((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/),
  }),
}), avatarUpdate);

module.exports = { usersRouters };
