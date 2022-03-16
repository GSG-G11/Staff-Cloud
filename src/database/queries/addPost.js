const connection = require('../config/connection');

module.exports = (title, description, salary, userId) => {
  const query = {
    text: 'INSERT INTO posts(title, description, salary, user_id) VALUES($1, $2, $3, $4)',
    values: [title, description, salary, userId],
  };
  return connection.query(query);
};
