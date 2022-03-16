const connection = require('../database/config/connection');

// eslint-disable-next-line consistent-return
const userOwnsPost = async (req, res, next) => {
  const getPost = await connection.query('SELECT user_id FROM posts WHERE id = $1', [req.params.id]);

  if (getPost.rows[0].user_id !== req.user.userId) {
    return res.status(403).send({
      message: 'You do not have permission to delete this post',
    });
  }

  next();
};

module.exports = userOwnsPost;
