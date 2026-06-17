const db = require('../config/database');

class PetModel {
  // Retorna todos os pets /pets
  static async getAllPets() {
    const [rows] = await db.query('SELECT * FROM pets');
    return rows;
  }

  // Retorna os pets disponíveis para adoção --> única rota de pets que é pública /pets/available
  static async getAvailablePets() {
    const [rows] = await db.query(
      'SELECT * FROM pets WHERE status = "available"'
    );
    return rows;
  }

  // Busca pet por id (usado pelo admin) /pets/:id
  static async getPetById(id) {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    return rows[0];
  }

  // Inserir um novo pet name, age, species, size, status, description
  static async createPet({ name, age, species, size, description }) {
    const [result] = await db.query(
      `INSERT INTO pets
    (name, age, species, size, status, description)
    VALUES (?, ?, ?, ?, 'available', ?)`,
      [name, age, species, size, description]
    );

    return {
      id: result.insertId,
      name,
      age,
      species,
      size,
      status: 'available',
      description,
    };
  }

  // Atualizar status do pet (usado para marcar como adotado) /adoptions
  static async updatePetStatus(id, status) {
    await db.query('UPDATE pets SET status = ? WHERE id = ?', [status, id]);
  }

  // Atualizar um pet existente
  static async updatePet(id, data) {
    await this.getPetById(id);

    await PetModel.updatePet(id, data);

    return await PetModel.getPetById(id);
  }

  static async deletePet(id) {
    const pet = await this.getPetById(id);

    if (pet.status === 'adopted') {
      const error = new Error('Pets adotados não podem ser removidos');

      error.statusCode = 400;
      throw error;
    }

    await PetModel.deletePet(id);
  }
}
module.exports = PetModel;
