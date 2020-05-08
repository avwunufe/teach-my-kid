const Joi = require('@hapi/joi');

const registerValidation = data => {
    const joiSchema = Joi.object().keys({
        FirstName: Joi.string().required(),
        LastName: Joi.string().required(),
        Email: Joi.string().email().required().min(6),
        Password: Joi.string().required().min(6),
        role: Joi.string().required()
    });
    return joiSchema.validate(data);
};

const loginValidation = data => {
    const joiSchema = Joi.object().keys({
        Email: Joi.string().email().required().min(6),
        Password: Joi.string().required().min(6)  
    });
    return joiSchema.validate(data);
};

const classValidation = data => {
    const joiSchema = Joi.object().keys({
        ClassName: Joi.string().required(),
        Session: Joi.string().required(),
        Arm: Joi.string().allow(""),
        Code: Joi.string().required(),              
        Creator: Joi.string().required()              
    })
    return joiSchema.validate(data)
};

const updateValidation = data => {
    const joiSchema = Joi.object().keys({
        FirstName: Joi.string().required(),
        LastName: Joi.string().required(),
        Email: Joi.string().email().required().min(6),
        Password: Joi.string().required().min(6),       
        NewPassword: Joi.string().required().min(6)               
    })
    return joiSchema.validate(data)
}



module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.updateValidation = updateValidation
module.exports.classValidation = classValidation
