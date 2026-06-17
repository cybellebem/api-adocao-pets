const db = require('../config/database');

class AdoptionModel {
  // Lista todas as adoções
  static async getAllAdoptions() {
    const [rows] =
      await db.query(`SELECT a.id, a.adoption_date, u.id AS user_id, u.name AS adopter_name, p.id AS pet_id, p.name AS pet_name
      FROM adoptions a
      INNER JOIN users u ON a.user_id = u.id
      INNER JOIN pets p ON a.pet_id = p.id
      ORDER BY a.adoption_date DESC
    `);

    return rows;
  }

  // Busca adoção por ID
  static async getAdoptionById(id) {
    const [rows] = await db.query('SELECT * FROM adoptions WHERE id = ?', [id]);

    return rows[0];
  }

  // Verifica se o usuário já adotou o pet
  static async getAdoptionByUserAndPet(userId, petId) {
    const [rows] = await db.query(
      'SELECT * FROM adoptions WHERE user_id = ? AND pet_id = ?',
      [userId, petId]
    );

    return rows[0];
  }

  // Lista adoções de um usuário
  static async getAdoptionsByUserId(userId) {
    const [rows] = await db.query('SELECT * FROM adoptions WHERE user_id = ?', [
      userId,
    ]);

    return rows;
  }

  // Cria adoção
  static async createAdoption({ user_id, pet_id, adoption_date }) {
    const [result] = await db.query(
      `INSERT INTO adoptions
      (user_id, pet_id, adoption_date)
      VALUES (?, ?, ?)`,
      [user_id, pet_id, adoption_date]
    );

    return {
      id: result.insertId,
      user_id,
      pet_id,
      adoption_date,
    };
  }

  // Remove adoção (opcional)
  static async deleteAdoption(id) {
    await db.query('DELETE FROM adoptions WHERE id = ?', [id]);
  }
}

module.exports = AdoptionModel;
