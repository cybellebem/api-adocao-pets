const db = require('../config/database');

class PetModel {
  // Retorna todos os pets /pets
  static async getAllPets() {
    const [rows] = await db.query('SELECT * FROM pets');
    return rows;
  }

  // GET /pets/available
  static async getAvailablePets() {
    const [rows] = await db.query(
      'SELECT * FROM pets WHERE status = "available"'
    );
    return rows;
  }

  // GET /pets/:id
  static async getPetById(id) {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    return rows[0];
  }

  // POST /pets
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

  // POST /adoptions
  static async updatePetStatus(id, status) {
    await db.query('UPDATE pets SET status = ? WHERE id = ?', [status, id]);
  }

  static async updatePet(id, { name, age, species, size, description }) {
    await db.query(
      `UPDATE pets
     SET name = ?,
         age = ?,
         species = ?,
         size = ?,
         description = ?
     WHERE id = ?`,
      [name, age, species, size, description, id]
    );
  }

  static async deletePet(id) {
    await db.query('DELETE FROM pets WHERE id = ?', [id]);
  }
}
module.exports = PetModel;
