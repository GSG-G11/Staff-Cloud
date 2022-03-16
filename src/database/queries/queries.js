const connection = require('../config/connection')
const addUserQuery = (name, email, password, address) => {
  const sql = {
    text: 'INSERT INTO users (name, email, password, address) VALUES ($1,$2,$3,$4) RETURNING *;',
    values: [name, email, password, address],
  };
  return connection.query(sql);
};

module.exports = { addUserQuery };
