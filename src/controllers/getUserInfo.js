const connection = require('../database/config/connection');

const getUserInfoFromPost = async (req, res) => {
  const { id } = req.params;

  const userName = await connection.query('SELECT users.name FROM users INNER JOIN posts ON users.id = posts.user_id WHERE users.id = $1', [id]);

  if (!userName.rows[0]) {
    // eslint-disable-next-line no-undef
    throw new NotFoundError('User not found');
  }

  return res.status(200).json({
    name: userName.rows[0].name,
  });
};

module.exports = getUserInfoFromPost;
