const UserService = require('../services/userService');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  static async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      await UserService.deleteUser(req.params.id);

      return res.status(200).json({
        message: 'Usuário removido com sucesso',
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = UserController;
