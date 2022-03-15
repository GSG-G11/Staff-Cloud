const signupSchema = require("../validation/signupSchema");

const addUserController = (req,res) => {
    console.log(req.body)
    signupSchema.validateAsync(req.body)
    .then (data=>console.log(data))
    .catch(err => console.log(err));

}
module.exports = addUserController;
