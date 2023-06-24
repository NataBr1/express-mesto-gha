const { celebrate, Joi } = require('celebrate');

const url = /^(https?:\/\/)(www\.)?([a-z1-9-]{2,}\.)+[a-z]{2,}\/?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/i;

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(url),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// const validationUpdateProfile = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30).required(),
//     about: Joi.string().min(2).max(30).required(),
//   }),
// });

// const validationUpdateAvatar = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required().regex(url),
//   }),
// });

// const validationUsersId = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().required().hex().length(24),
//   }),
// });

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(url),
  }),
});

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validationLogin,
  validationCreateUser,
  // validationUpdateProfile,
  // validationUpdateAvatar,
  // validationUsersId,
  validationCreateCard,
  validationCardId,
};
