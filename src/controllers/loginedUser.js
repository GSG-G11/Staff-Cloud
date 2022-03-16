const loginedUser = (req, res) => {
  res.status(200).json({ meg: 'yes there have user', id: req.user.userId });
};
module.exports = loginedUser;
