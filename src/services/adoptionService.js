const appError = require('../utils/appError');

const { validatePositiveInteger } = require('../utils/validators');

const AdoptionModel = require('../models/adoptionModel');
const PetModel = require('../models/petModel');

class AdoptionService {
  static async createAdoption(userId, petId) {
    validatePositiveInteger(userId, 'userId');
    validatePositiveInteger(petId, 'petId');

    const pet = await PetModel.getPetById(petId);

    if (!pet) {
      throw appError('Pet não encontrado', 404);
    }

    if (pet.status !== 'available') {
      throw appError('Pet não está disponível', 400);
    }

    const adoption = await AdoptionModel.createAdoption({
      user_id: userId,
      pet_id: petId,
      adoption_date: new Date(),
    });

    await PetModel.updatePetStatus(petId, 'adopted');

    return adoption;
  }
}

module.exports = AdoptionService;
