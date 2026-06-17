const PetService = require('../services/petService');

class PetController {
  static async getAllPets(req, res) {
    try {
      const pets = await PetService.getAllPets();

      return res.status(200).json(pets);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async getAvailablePets(req, res) {
    try {
      const pets = await PetService.getAvailablePets();

      return res.status(200).json(pets);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async getPetById(req, res) {
    try {
      const pet = await PetService.getPetById(req.params.id);

      return res.status(200).json(pet);
    } catch (error) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  static async createPet(req, res) {
    try {
      const pet = await PetService.createPet(req.body);

      return res.status(201).json(pet);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async updatePet(req, res) {
    try {
      const pet = await PetService.updatePet(req.params.id, req.body);

      return res.status(200).json(pet);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async deletePet(req, res) {
    try {
      await PetService.deletePet(req.params.id);

      return res.status(200).json({
        message: 'Pet removido com sucesso',
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = PetController;
