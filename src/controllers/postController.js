/* eslint-disable consistent-return */
const addPostQuery = require('../database/queries/addPost');
const postValidation = require('../utils/validation/post-validation');

module.exports = async (req, res) => {
  try {
    const { title, desc, salary } = req.body;
    const { userId } = req;
    await postValidation.validateAsync({ title, desc, salary });

    await addPostQuery(title, desc, salary, userId);
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
