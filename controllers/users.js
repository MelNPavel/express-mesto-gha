const User = require ("../models/user.js");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
}

const userId = async(req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).send(user)
};

const userCreate = async(req, res) => {
  const userN = await new User(req.body).save();
  res.status(200).send(userN);
};

module.exports = {
  getUsers,
  userId,
  userCreate
};