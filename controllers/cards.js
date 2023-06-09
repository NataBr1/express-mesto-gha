const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию', err: err.message, stack: err.stack }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию', err: err.message, stack: err.stack });
      }
    });
};

//Сделать удаление карточки
const deleteCard = (req, res) => {
  const cardId = req.params.id;
    if (!cardId) {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
        return;
    }
  Card.findByIdAndRemove(cardId)
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию', err: err.message, stack: err.stack }));
}

//Постановка лайка
const likeCard = (req, res) => {
  const cardId = req.params.cardId;
  if (!cardId) {
    res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      return;
  }
  Card.findByIdAndUpdate(
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию', err: err.message, stack: err.stack }));
}

//Удаление лайка
const dislikeCard = (req, res) => {
  const cardId = req.params.cardId;
  if (!cardId) {
    res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      return;
  }
  Card.findByIdAndUpdate(
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию', err: err.message, stack: err.stack }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
