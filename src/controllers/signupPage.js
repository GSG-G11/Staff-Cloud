const { join } = require('path');

const signupPage = (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
};

module.exports = signupPage;