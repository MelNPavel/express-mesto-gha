const express = require('express');

const usersRouters = express.Router();
const {
  getUsers,
  userFindId,
  userCreate,
  userUpdate,
  avatarUpdate,
} = require('../controllers/users');

usersRouters.get('/users', express.json(), getUsers);

usersRouters.get('/users/:userId', express.json(), userFindId);

usersRouters.post('/users', express.json(), userCreate);

usersRouters.patch('/users/me', express.json(), userUpdate);

usersRouters.patch('/users/me/avatar', express.json(), avatarUpdate);

module.exports = { usersRouters };
