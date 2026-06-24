const express = require('express');

const authNMiddleware = require('../middlewares/authNMiddleware');
const authZMiddleware = require('../middlewares/authZMiddleware');

const AdoptionController = require('../controllers/adoptionController');

const router = express.Router();

router.get(
  '/',
  authNMiddleware,
  authZMiddleware('admin'),
  AdoptionController.getAllAdoptions
);

router.post(
  '/',
  authNMiddleware,
  authZMiddleware('adopter'),
  AdoptionController.createAdoption
);

module.exports = router;
