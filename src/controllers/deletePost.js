const connection = require('../database/config/connection');

const deletePost = async (req, res) => {
  const { id } = req.params;

  // eslint-disable-next-line no-shadow
  const deletePost = await connection.query('DELETE FROM posts WHERE id = $1', [id]);

  if (!deletePost.rowCount) {
    return res.status(404).send({
      message: 'Post not found',
    });
  }

  return res.status(204).send();
};

module.exports = deletePost;
