const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Укажите свое имя'],
    minlength: [2, 'Минимальная длина поля "имя" - 2'],
    maxlength: [30, 'Максимальная длина поля "имя" - 30'],
  },
  about: {
    type: String,
    required: [true, 'Укажите свою профессию'],
    minlength: [2, 'Минимальная длина поля "профессия" - 2'],
    maxlength: [30, 'Максимальная длина поля "профессия" - 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Добавьте ссылку для аватара'],
  },
});

module.exports = mongoose.model('user', userSchema);
