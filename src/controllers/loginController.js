const LoginService = require('../services/loginService');

class LoginController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await LoginService.login(email, password);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
}

module.exports = LoginController;
