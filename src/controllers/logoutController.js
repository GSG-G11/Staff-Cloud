const logoutController = (req, res) => {
  res.clearCookie('token').redirect('/login');
};

module.exports = logoutController;
