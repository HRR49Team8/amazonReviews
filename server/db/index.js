const { Pool } = require('pg');
const redis = require('redis');

const client = redis.createClient({
  port: 6379,
  host: process.env.REDIS || '127.0.0.1',
});

const config = {
  host: process.env.DBSERVER || 'localhost',
  user: 'student',
  password: 'student',
  port: 5432,
  database: 'amazonreviews',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
const pool = new Pool(config);

client.on('error', (err) => console.error(err));

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  pool,
  client,
};
