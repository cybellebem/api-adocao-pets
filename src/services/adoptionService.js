const AdoptionModel = require('../models/adoptionModel');
const UserModel = require('../models/userModel');
const PetModel = require('../models/petModel');

class AdoptionService {
  static async createAdoption(userId, petId) {
    const user = await UserModel.getUserById(userId);

    if (!user) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    if (user.role !== 'adopter') {
      const error = new Error('Apenas adopters podem adotar pets');
      error.statusCode = 400;
      throw error;
    }

    const pet = await PetModel.getPetById(petId);

    if (!pet) {
      const error = new Error('Pet não encontrado');
      error.statusCode = 404;
      throw error;
    }

    if (pet.status !== 'available') {
      const error = new Error('Pet não está disponível');
      error.statusCode = 400;
      throw error;
    }

    const alreadyAdopted = await AdoptionModel.getAdoptionByUserAndPet(
      userId,
      petId
    );

    if (alreadyAdopted) {
      const error = new Error('Usuário já adotou este pet');
      error.statusCode = 400;
      throw error;
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
