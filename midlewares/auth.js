const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, process.env['JWT.SECRET']);
  } catch (e) {
    next(new UnauthorizedError('Отказ в доступе'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
