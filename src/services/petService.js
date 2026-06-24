const appError = require('../utils/appError');

const { validateRequiredString } = require('../utils/validators');

const PetModel = require('../models/petModel');

class PetService {
  static async getAllPets() {
    return await PetModel.getAllPets();
  }

  static async getAvailablePets() {
    return await PetModel.getAvailablePets();
  }

  static async getPetById(id) {
    const pet = await PetModel.getPetById(id);

    if (!pet) {
      throw appError('Pet não encontrado', 404);
    }

    return pet;
  }

  static async createPet(data) {
    validateRequiredString(data.name, 'Name');
    validateRequiredString(data.species, 'Species');
    validateRequiredString(data.size, 'Size');
    validateRequiredString(data.description, 'Description');

    return await PetModel.createPet({
      name: data.name,
      age: data.age,
      species: data.species,
      size: data.size,
      description: data.description,
    });
  }

  static async updatePet(id, data) {
    const pet = await PetModel.getPetById(id);

    if (!pet) {
      throw appError('Pet não encontrado', 404);
    }

    validateRequiredString(data.name, 'Nome');
    validateRequiredString(data.species, 'Espécie');
    validateRequiredString(data.size, 'Tamanho');
    validateRequiredString(data.description, 'Descrição');

    await PetModel.updatePet(id, {
      name: data.name,
      age: data.age,
      species: data.species,
      size: data.size,
      description: data.description,
    });

    return await PetModel.getPetById(id);
  }

  static async deletePet(id) {
    const pet = await PetModel.getPetById(id);

    if (!pet) {
      throw appError('Pet não encontrado', 404);
    }

    if (pet.status === 'adopted') {
      throw appError('Pets adotados não podem ser removidos', 400);
    }

    await PetModel.deletePet(id);
  }
}

module.exports = PetService;
