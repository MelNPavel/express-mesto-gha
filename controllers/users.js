const User = require ("../models/user.js");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
}

const userId = async(req, res) => {
  const user = await User.findById({id});
  res.status(200).send(user)
};

const userCreate = async(req, res) => {
  const user = await User.create(req.body);
  res.send(user);
};

module.exports = {
  getUsers,
  userId,
  userCreate
};