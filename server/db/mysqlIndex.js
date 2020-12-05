const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'hrstudent',
  password: '1q@W3e$R',
  database: 'amazonreviews',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database for Joe\'s Amazon Reviews service', err);
    return;
  }
  console.log('Connected to MySQL database for Joe\'s Amazon Reviews service!');
});

module.exports = connection;
