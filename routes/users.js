const express = require('express');

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

usersRouters.patch('/users/me', express.json(), userUpdate);
usersRouters.patch('/users/me/avatar', express.json(), avatarUpdate);

module.exports = { usersRouters };
