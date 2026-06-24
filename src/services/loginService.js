const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');

const { validateEmail, validatePassword } = require('../utils/validators');

const UserModel = require('../models/userModel');

class LoginService {
  static async login(email, password) {
    validateEmail(email);
    validatePassword(password);

    const user = await UserModel.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw appError('Email ou senha inválidos', 401);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}

module.exports = LoginService;
