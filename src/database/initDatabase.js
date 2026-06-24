const fs = require('fs');
const path = require('path');

const db = require('../config/database');

async function initDatabase() {
  try {
    const create_db = fs.readFileSync(
      path.join(__dirname, 'create_database.sql'),
      'utf8'
    );

    const create_tables = fs.readFileSync(
      path.join(__dirname, 'create_tables.sql'),
      'utf8'
    );

    const seed = fs.readFileSync(path.join(__dirname, 'seed_data.sql'), 'utf8');

    await db.query(create_db);
    await db.query(create_tables);

    console.log('Schema criado');

    await db.query(seed);

    console.log('Seed executado');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);

    process.exit(1);
  }
}

initDatabase();
