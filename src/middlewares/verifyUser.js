const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors')
const verifyToken = (req, res, next) => {

  // Get token from cookies
  const token = req.cookies.token;
  
  // If no token, return error
  if (!token) {
    throw new UnauthenticatedError('No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new UnauthenticatedError('Invalid token');
    }

    const {userId, email, post_user_id} = decoded;
    const user = {userId, email};

    req.user = user;
    
    next();
  })
};

module.exports = verifyToken;
