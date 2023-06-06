const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use(router);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Слушаю порт 3000!!!');
});
