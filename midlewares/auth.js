const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (e) {
    next(new UnauthorizedError('Отказ в доступе'));
  }
  req.user = payload;
  next();
};

// process.env['JWT.SECRET']

module.exports = auth;
