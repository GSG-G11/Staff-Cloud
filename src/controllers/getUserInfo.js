const connection = require('../database/config/connection');

const { NotFoundError } = require('../errors');

const getUserInfoFromPost = async (req, res) => {
  const { id } = req.params;


  const userName = await connection.query('SELECT users.id, users.name FROM users INNER JOIN posts ON users.id = posts.user_id WHERE users.id = $1', [id]);

  if (!userName.rows[0]) {
    throw new NotFoundError('User not found');
  }

  return res.status(200).json({
    id: userName.rows[0].id,
    name: userName.rows[0].name,
  });
};

module.exports = getUserInfoFromPost;
