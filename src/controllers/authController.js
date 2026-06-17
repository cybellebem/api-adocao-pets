const AuthService = require('../services/authService');

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(email, password);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
}

module.exports = AuthController;
