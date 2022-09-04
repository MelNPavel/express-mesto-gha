const User = require ("../models/user.js");

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const getUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).send(users);
    }catch(e) {
        return res.status(400).send({message: "Ошибка в запросе"})
    }
}

const userId = async(req, res) => {
    try{
        const { userId } = req.params;
        const user = await User.findById( userId );
        if (!user){
            return res.status(NOT_FOUND).send({message: "Такого пользователя нет"})};
        return res.status(200).send(user)
    }catch(e) {
        if (e.name === 'ReferenceError'){
            return res.status(BAD_REQUEST).send({message: "Ошибка в запросе"})};
            res.status(INTERNAL_SERVER_ERROR).send({message: "Произошла ошибка на сервере"})
    }
};

const userCreate = async(req, res) => {
    try{
        const user = await new User(req.body).save();
        res.status(200).send(user);
    }catch(e) {
        if (e.name === 'ValidationError'){
            return res.status(BAD_REQUEST).send({message: "Ошибка в запросе"})};
        res.status(INTERNAL_SERVER_ERROR).send({message: "Произошла ошибка на сервере"});
    }
};

const userUpdate = async(req, res) => {
    try{
        const { name, about } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, {name, about});
        if (!user){
            return res.status(NOT_FOUND).send({message: "Такого пользователя нет"})
        }
        return res.status(200).send(user);
    }catch(e) {
        if (e.name === 'ValidationError'){
            return res.status(BAD_REQUEST).send({message: "Ошибка в запросе"})};
        res.status(INTERNAL_SERVER_ERROR).send({message: "Произошла ошибка на сервере"});
    }
};

const avatarUpdate = async(req, res) => {
    try{
        const avatar = req.body.avatar;
        const user = await User.findByIdAndUpdate(req.user._id, avatar);
        res.status(200).send(user);
    }catch(e) {
        if (e.name === 'ValidationError'){
            return res.status(BAD_REQUEST).send({message: "Ошибка в запросе"})};
        res.status(INTERNAL_SERVER_ERROR).send({message: "Произошла ошибка на сервере"});
    }
};

module.exports = {
  getUsers,
  userId,
  userCreate,
  userUpdate,
  avatarUpdate
};