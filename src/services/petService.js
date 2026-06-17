const PetModel = require('../models/petModel');

class PetService {
  // GET /pets
  static async getAllPets() {
    return await PetModel.getAllPets();
  }

  // GET /pets/available
  static async getAvailablePets() {
    return await PetModel.getAvailablePets();
  }

  // GET /pets/:id
  static async getPetById(id) {
    const pet = await PetModel.getPetById(id);

    if (!pet) {
      const error = new Error('Pet não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return pet;
  }

  // POST /pets
  static async createPet(data) {
    return await PetModel.createPet({
      name: data.name,
      age: data.age,
      species: data.species,
      size: data.size,
      description: data.description,
    });
  }

  // PUT /pets/:id
  static async updatePet(id, data) {
    const pet = await PetModel.getPetById(id);

    if (!pet) {
      const error = new Error('Pet não encontrado');
      error.statusCode = 404;
      throw error;
    }

    await PetModel.updatePet(id, data);

    return await PetModel.getPetById(id);
  }

  // DELETE /pets/:id
  static async deletePet(id) {
    const pet = await PetModel.getPetById(id);

    if (!pet) {
      const error = new Error('Pet não encontrado');
      error.statusCode = 404;
      throw error;
    }

    if (pet.status === 'adopted') {
      const error = new Error('Pets adotados não podem ser removidos');
      error.statusCode = 400;
      throw error;
    }

    await PetModel.deletePet(id);
  }
}

module.exports = PetService;
