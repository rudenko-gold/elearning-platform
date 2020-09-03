const Joi = require("@hapi/joi");

// Register validation
const register_validataion = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(6).required(),
        last_name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

// Login validation
const login_validation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

module.exports.register_validation = register_validataion;
module.exports.login_validation = login_validation;