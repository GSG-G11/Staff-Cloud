const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
require('dotenv').config();
const signupSchema = require("../validation/signupSchema");
const {addUserQuery} = require('../database/queries/queries');

const addUserController = (req,res) => {
    signupSchema.validateAsync(req.body)
    .then ((data)=> {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) { console.log('err',err);}
            else {
                const {name, email, password,  address} = data
                bcrypt.hash(password, salt)
                  .then (pass => {     
                      addUserQuery(name, email, pass, address)
                      .then(()=>res.json({massege:'add user successfully'}))
                      .catch(err => res.status(500).json(err));
                })
            }  
        })
    })
    .catch(err => res.status(401).json(err));

}
module.exports = addUserController;
