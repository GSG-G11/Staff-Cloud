const logout = ((req, res) => {
  res.clearCookie('token', { path: '/' });
  res.redirect('/');
});
module.exports = logout;
