/* eslint-disable consistent-return */
const addPostQuery = require('../database/queries/addPost');
const postValidation = require('../utils/validation/post-validation');

module.exports = async (req, res) => {
  try {
    const { title, description, salary } = req.body;
    const { userId } = req.user;
    await postValidation.validateAsync({ title, description, salary });
    await addPostQuery(title, description, salary, userId);
    return res.status(201).json({
      status: 'success',
      message: 'Post successfully added',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
};
