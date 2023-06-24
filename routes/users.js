const router = require('express').Router();
const {
  getUsers,
  getUsersById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const {
  validationUpdateProfile,
  validationUpdateAvatar,
  validationUsersId,
} = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validationUsersId, getUsersById);
router.patch('/me', validationUpdateProfile, updateProfile);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
