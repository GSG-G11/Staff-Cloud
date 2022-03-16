const getPosts = require('../database/queries/getPosts');

module.exports = async (req, res) => {
  try {
    const posts = await getPosts();
    return res.status(200).json({
      message: 'posts get successfully ',
      posts,
    });
  } catch (error) {
    return res.json({
      status: 'error',
      message: error,
    });
  }
};
