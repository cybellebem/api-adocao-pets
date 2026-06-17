/**
 * Valida os dados de um pet antes de inserção ou atualização.
 * Lança erro se algum campo for inválido.
 */

function validatePet({ name, age, species, size, status, description }) {
  // Valida nome
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('O nome do pet é obrigatório e deve ser uma string.');
  }

  // Valida idade
  if (typeof age !== 'number' || isNaN(age) || age <= 0) {
    throw new Error('A idade deve ser um número positivo válido.');
  }

  // Valida espécie
  if (typeof species !== 'string' || species.trim() === '') {
    throw new Error('A espécie do pet é obrigatória e deve ser uma string.');
  }

  // Valida tamanho
  if (typeof size !== 'string' || size.trim() === '') {
    throw new Error('O tamanho do pet é obrigatório e deve ser uma string.');
  }

  // Valida status
  if (typeof status !== 'string' || status.trim() === '') {
    throw new Error('O status do pet é obrigatório e deve ser uma string.');
  }

  // Valida descrição
  if (typeof description !== 'string') {
    throw new Error('A descrição do pet deve ser uma string.');
  }
}

module.exports = validatePet;
