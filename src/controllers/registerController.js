const bcrypt = require('bcrypt');
const signupSchema = require('../utils/validation/signupSchema');
const { addUserQuery } = require('../database/queries/addUserQuery');
const { getUserQuery } = require('../database/queries/getUserQuery');

const registerController = (req, res) => {
  signupSchema.validateAsync(req.body, { abortEarly: false })
    .then((data) => {
      const {
        name, email, password, address,
      } = data;
      getUserQuery(email)
        .then((user) => {
          if (user.rows.length !== 1) {
            bcrypt.genSalt(10, (err, salt) => {
              if (err) { console.log('err', err); } else {
                bcrypt.hash(password, salt)
                  .then((pass) => {
                    addUserQuery(name, email, pass, address)
                      .then(() => res.json({ massege: 'add user successfully' }))
                      // eslint-disable-next-line no-shadow
                      .catch((err) => res.status(500).json(err));
                  });
              }
            });
          } else {
            res.status(400).json({ massege: 'This user exists' });
          }
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(400).json({
      message: err.details.map((i) => i.message),
    }));
};
module.exports = registerController;
