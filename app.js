const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { NOT_FOUND } = require('./controllers/errors');

// eslint-disable-next-line no-undef
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6480ea3c724559b2a7817927',
  };

  next();
});

app.use(router);
app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт ${PORT}`);
});
