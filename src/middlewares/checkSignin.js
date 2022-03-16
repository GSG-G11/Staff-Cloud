const { verifyToken } = require('../utils/jwt');
require('dotenv').config();

const {
  env: { JWT_SECRET },
} = process;
module.exports = async (req, res, next) => {
  try {
    const {
      cookies: { token },
    } = req;
    if (token) {
      const value = await verifyToken(token, JWT_SECRET);
      req.body.userId = value.userId;
      next();
    } else {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
  } catch (err) {
    if (err.message.includes('invalid')) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
    } else {
      res.status(500).json({ status: 500, message: 'Server error' });
    }
  }
};
