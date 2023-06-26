const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth_err');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    throw new AuthError('Необходимо авторизоваться');
  }
  req.user = payload;
  next();
};

module.exports = auth;
