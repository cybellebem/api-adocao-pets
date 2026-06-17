const bcrypt = require('bcrypt');

const UserModel = require('../models/userModel');

class UserService {
  // GET /users
  static async getAllUsers() {
    return await UserModel.getAllUsers();
  }

  // GET /users/:id
  static async getUserById(id) {
    const user = await UserModel.getUserById(id);

    if (!user) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  // POST /users
  static async createUser(data) {
    const existingUser = await UserModel.getUserByEmail(data.email);

    if (existingUser) {
      const error = new Error('Já existe um usuário com este email');
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await UserModel.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      role: data.role || 'adopter',
    });
  }

  // PUT /users/:id
  static async updateUser(id, data) {
    const user = await UserModel.getUserById(id);

    if (!user) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    let password = user.password;

    if (data.password) {
      password = await bcrypt.hash(data.password, 10);
    }

    await UserModel.updateUser(id, {
      name: data.name,
      email: data.email,
      password,
      phone: data.phone,
      role: data.role,
    });

    return await UserModel.getUserById(id);
  }

  // DELETE /users/:id
  static async deleteUser(id) {
    const user = await UserModel.getUserById(id);

    if (!user) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    await UserModel.deleteUser(id);
  }
}

module.exports = UserService;
