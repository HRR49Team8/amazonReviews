const { Pool } = require('pg');

// Maybe add config here?
const pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// const client = new Client();

// const connect = async () => {
//   await client.connect();
// };

module.exports = {
  pool,
};
