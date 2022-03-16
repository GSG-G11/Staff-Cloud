const loginedUser = (req, res) => {
  res.status(200).json({ meg: 'yes there have user' });
};
module.exports = loginedUser;
