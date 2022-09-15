const express = require('express');

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
usersRouters.get('/users/:userId', userFindId);

usersRouters.patch('/users/me', userUpdate);
usersRouters.patch('/users/me/avatar', avatarUpdate);

module.exports = { usersRouters };

// express.json(),
