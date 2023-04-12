
const express = require('express');
const router = express.Router();
const {
  createUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser
} = require('../controllers/usersController');

// const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getUsers).post(createUser)
router.put('/:userId', updateUser)
router.route('/:id').get(getUser);
router.route('/:userId').delete(deleteUser);

module.exports = router;