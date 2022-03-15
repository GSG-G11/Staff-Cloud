const { connection } = require('../database/config/connection');
const { insertUserQuery } = require('../database/queries/queries')


const addUser = async (req, res) => {
  try {
    const { rows } = await connection.query(insertUserQuery,[name,email,password,address]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = addUser;
