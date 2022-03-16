const connection = require('../database/config/connection');
const { verifyToken } = require('../utils/jwt');
require('dotenv').config();

const getUserInfoFromPost = async (req, res) => {
  const {
    env: { JWT_SECRET },
  } = process;
  const {
    cookies: { token },
  } = req;
  const value = await verifyToken(token, JWT_SECRET);
  const userName = await connection.query('SELECT users.name FROM users WHERE users.id = $1', [value.userId]);
  if (!value) {
    // eslint-disable-next-line no-undef
    throw new NotFoundError('User not found');
  }

  return res.status(200).json({
    name: userName.rows[0].name,
  });
};

module.exports = getUserInfoFromPost;
