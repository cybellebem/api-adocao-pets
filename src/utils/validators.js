const appError = require('./appError');

const validateRequiredString = (value, fieldName) => {
  if (
    value === undefined ||
    value === null ||
    typeof value !== 'string' ||
    value.trim().length === 0
  ) {
    throw appError(`${fieldName} é obrigatório`, 400);
  }
};

const validateEmail = (email) => {
  validateRequiredString(email, 'Email');

  if (!email.includes('@')) {
    throw appError('Email inválido', 400);
  }
};

const validatePassword = (password) => {
  validateRequiredString(password, 'Senha');

  if (password.trim().length < 1) {
    throw new appError('A senha deve possuir pelo menos 1 caractere', 400);
  }
};

const validatePositiveInteger = (value, fieldName) => {
  const number = Number(value);

  if (!Number.isInteger(number) || number <= 0) {
    throw appError(`${fieldName} deve ser um número inteiro positivo`, 400);
  }

  return number;
};

module.exports = {
  validateRequiredString,
  validateEmail,
  validatePassword,
  validatePositiveInteger,
};
