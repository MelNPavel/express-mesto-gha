const express = require("express");
const usersRouters = express.Router();
const { getUsers, userId, userCreate, userUpdate, avatarUpdate } = require("../controllers/users.js");

usersRouters.get ("/users", express.json(), getUsers);

usersRouters.get ("/users/:userId", express.json(), userId);

usersRouters.post ("/users", express.json(), userCreate);

usersRouters.patch ("/users/me", express.json(), userUpdate);

usersRouters.patch ("/users/me/avatar", express.json(), avatarUpdate);

module.exports = { usersRouters };

// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар