const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const url = require('../utils/const_url');

const {
  getUsers,
  getUsersById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// const {
//   validationUpdateProfile,
//   validationUpdateAvatar,
//   validationUsersId,
// } = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUsersById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(url),
  }),
}), updateAvatar);

// router.get('/:userId', validationUsersId, getUsersById);
// router.patch('/me', validationUpdateProfile, updateProfile);
// router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
