const Card = require('../models/card');
const {BAD_REQ, NOT_FOUND, DEFAULT_ERROR} = require ('./errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(BAD_REQ).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

//удаление карточки
const deleteCard = (req, res) => {
  const cardId = req.params.id;
    if (!cardId) {
      res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
        return;
    }
  Card.findByIdAndRemove(cardId)
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' }));
}

//Постановка лайка
const likeCard = (req, res) => {
  const cardId = req.params.cardId;
  if (!cardId) {
    res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      return;
  }
  Card.findByIdAndUpdate(
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' }));
}

//Удаление лайка
const dislikeCard = (req, res) => {
  const cardId = req.params.cardId;
  if (!cardId) {
    res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      return;
  }
  Card.findByIdAndUpdate(
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
