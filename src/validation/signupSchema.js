const Joi = require('joi');
const signupSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})
module.exports = signupSchema;
