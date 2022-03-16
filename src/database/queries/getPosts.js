const connection = require('../config/connection');

module.exports = async () => {
  const { rows } = await connection.query('SELECT * FROM posts ORDER BY id DESC');
  return rows;
};
