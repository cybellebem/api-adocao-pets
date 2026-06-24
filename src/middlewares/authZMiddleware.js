const authZMiddleware = (rule) => {
  return (req, res, next) => {
    switch (rule) {
      case 'admin':
        if (req.user.role === 'admin') {
          return next();
        }
        break;

      case 'adminOrOwner':
        if (
          req.user.role === 'admin' ||
          req.user.userId === Number(req.params.id)
        ) {
          return next();
        }
        break;

      case 'adopter':
        if (req.user.role === 'adopter') {
          return next();
        }
        break;
    }

    return res.status(403).json({
      message: 'Acesso negado',
    });
  };
};

module.exports = authZMiddleware;
