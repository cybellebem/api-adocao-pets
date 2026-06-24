const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');

const authNMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw appError('Token não informado', 401);
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch {
    next(appError('Token inválido ou expirado', 401));
  }
};

module.exports = authNMiddleware;
