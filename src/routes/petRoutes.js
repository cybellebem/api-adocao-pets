const express = require('express');

const authNMiddleware = require('../middlewares/authNMiddleware');
const authZMiddleware = require('../middlewares/authZMiddleware');

const PetController = require('../controllers/petController');

const router = express.Router();

// Rota pública
router.get('/available', PetController.getAvailablePets);

// Rotas protegidas (admin)
router.get(
  '/',
  authNMiddleware,
  authZMiddleware('admin'),
  PetController.getAllPets
);

router.get(
  '/:id',
  authNMiddleware,
  authZMiddleware('admin'),
  PetController.getPetById
);

router.post(
  '/',
  authNMiddleware,
  authZMiddleware('admin'),
  PetController.createPet
);

router.put(
  '/:id',
  authNMiddleware,
  authZMiddleware('admin'),
  PetController.updatePet
);

router.delete(
  '/:id',
  authNMiddleware,
  authZMiddleware('admin'),
  PetController.deletePet
);

module.exports = router;
