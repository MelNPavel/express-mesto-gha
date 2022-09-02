const express = require("express");
const usersRouters = express.Router();
const { getUsers, userId, userCreate } = require("../controllers/users.js");

usersRouters.get ("/users", express.json(), getUsers);

usersRouters.get ("/users/:userId", express.json(), userId);

usersRouters.post ("/users", express.json(), userCreate);

module.exports = { usersRouters };

