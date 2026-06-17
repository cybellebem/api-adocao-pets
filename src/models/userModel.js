const db = require('../config/database');

class UserModel {
  // Retorna todos os usuários
  static async getAllUsers() {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role FROM users'
    );

    return rows;
  }

  // Busca usuário por ID
  static async getUserById(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role FROM users WHERE id = ?',
      [id]
    );

    return rows[0];
  }

  // Busca usuário por email (utilizado no login)
  static async getUserByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    return rows[0];
  }

  // Cria novo usuário
  static async createUser({ name, email, password, phone, role }) {
    const [result] = await db.query(
      `INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)`,
      [name, email, password, phone, role]
    );
    return {
      id: result.insertId,
      name,
      email,
      phone,
      role,
    };
  }

  // Atualiza usuário
  static async updateUser(id, { name, email, password, phone, role }) {
    await db.query(
      `UPDATE users
       SET name = ?,
           email = ?,
           password = ?,
           phone = ?,
           role = ?
       WHERE id = ?`,
      [name, email, password, phone, role, id]
    );
  }

  // Remove usuário
  static async deleteUser(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = UserModel;
