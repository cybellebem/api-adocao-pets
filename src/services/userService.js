const bcrypt = require('bcrypt');
const appError = require('../utils/appError');

const {
  validateRequiredString,
  validateEmail,
  validatePassword,
} = require('../utils/validators');

const UserModel = require('../models/userModel');
const AdoptionModel = require('../models/adoptionModel');

class UserService {
  static async getAllUsers() {
    return await UserModel.getAllUsers();
  }

  static async getUserById(id) {
    const user = await UserModel.getUserById(id);

    if (!user) {
      throw new appError('Usuário não encontrado', 404);
    }

    return user;
  }

  static async createUser(data) {
    validateRequiredString(data.name, 'Nome');
    validateRequiredString(data.phone, 'Telefone');
    validateEmail(data.email);
    validatePassword(data.password);

    const existingUser = await UserModel.getUserByEmail(data.email);

    if (existingUser) {
      throw new appError('Este email já está sendo utilizado', 400);
    }

    const password = await bcrypt.hash(data.password, 10);

    return await UserModel.createUser({
      name: data.name.trim(),
      email: data.email.trim(),
      password,
      phone: data.phone.trim(),
      role: 'adopter',
    });
  }

  static async updateUser(id, data) {
    const user = await UserModel.getUserById(id);

    if (!user) {
      throw new appError('Usuário não encontrado', 404);
    }

    validateRequiredString(data.name, 'Nome');
    validateEmail(data.email);
    validateRequiredString(data.phone, 'Telefone');

    let password = user.password;

    if (data.password !== undefined) {
      validatePassword(data.password);
      password = await bcrypt.hash(data.password, 10);
    }

    const existingUser = await UserModel.getUserByEmail(data.email);

    if (existingUser && Number(existingUser.id) !== Number(id)) {
      throw new appError('Este email já está sendo utilizado', 400);
    }

    await UserModel.updateUser(id, {
      name: data.name.trim(),
      email: data.email.trim(),
      password,
      phone: data.phone.trim(),
      role: user.role,
    });

    return await UserModel.getUserById(id);
  }

  static async deleteUser(id) {
    const user = await UserModel.getUserById(id);

    if (!user) {
      throw new appError('Usuário não encontrado', 404);
    }
    const adocao = await AdoptionModel.getAdoptionsByUserId(id);

    if (adocao.length > 0) {
      throw new appError(
        'Não é possível deletar usuários que possuem adoções realizadas',
        400
      );
    }

    await UserModel.deleteUser(id);
  }
}

module.exports = UserService;
