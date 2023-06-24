const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/users');
const {
  validationLogin,
  validationCreateUser,
} = require('./middlewares/validations');
const errorHandler = require('./middlewares/error');

// eslint-disable-next-line no-undef
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

app.use(cookieParser());

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use(router);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт ${PORT}`);
});
