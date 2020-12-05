const { Pool } = require('pg');

// Maybe add config here?
const config = {
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'amazonreviews',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
const pool = new Pool(config);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  pool,
};
