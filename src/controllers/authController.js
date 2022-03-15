const { sign } = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const connection = require('../database/config/connection');

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate the user input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    // Password should contain at least one number, one lowercase and one uppercase letter and one special charcater, and at least 8 characters long
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: error.details.map((err) => err.message),
    });
  }

  // Check if the user exists
  const userEmail = await connection.query('SELECT * FROM users WHERE email = $1', [email]);

  if (!userEmail.rows[0]) {
    return res.status(400).json({
      error: 'Email does not exist, Please Sign Up',
    });
  }

  // Check if the password is correct

  // Uncomment when the sign up is complete
  // const validatePassword = await bcrypt.compare(password, userEmail.rows[0].password);

  const validatePassword = password === userEmail.rows[0].password;

  if (!validatePassword) {
    return res.status(400).json({
      error: 'Password is incorrect',
    });
  }

  // Create and assign a token
  const payload = {
    userId: userEmail.rows[0].id,
    email: userEmail.rows[0].email,
  };

  const token = await sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({
    message: 'Login successful',
    token,
  });
};

module.exports = { login };
