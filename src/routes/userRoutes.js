const express = require('express');

const authNMiddleware = require('../middlewares/authNMiddleware');
const authZMiddleware = require('../middlewares/authZMiddleware');

const UserController = require('../controllers/userController');

const router = express.Router();

// Pública
router.post('/', UserController.createUser);

// Apenas admin
router.get(
  '/',
  authNMiddleware,
  authZMiddleware('admin'),
  UserController.getAllUsers
);

router.delete(
  '/:id',
  authNMiddleware,
  authZMiddleware('admin'),
  UserController.deleteUser
);

// Admin ou próprio usuário
router.get(
  '/:id',
  authNMiddleware,
  authZMiddleware('adminOrOwner'),
  UserController.getUserById
);

router.put(
  '/:id',
  authNMiddleware,
  authZMiddleware('adminOrOwner'),
  UserController.updateUser
);

module.exports = router;
