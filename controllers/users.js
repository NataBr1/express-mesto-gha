const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию', err: err.message, stack: err.stack }));
};

const getUsersById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден', err: err.message, stack: err.stack});
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию', err: err.message, stack: err.stack });
      }
    })
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию', err: err.message, stack: err.stack }));
};

//обновляет профиль
const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные', err: err.message, stack: err.stack});
      } else if (err.message === 'Not Found') {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден', err: err.message, stack: err.stack});
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию', err: err.message, stack: err.stack });
      }
    })
};

// обновляет аватар
const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные', err: err.message, stack: err.stack});
      } else if (err.message === 'Not Found') {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден', err: err.message, stack: err.stack});
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию', err: err.message, stack: err.stack });
      }
    })
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateProfile,
  updateAvatar
};
