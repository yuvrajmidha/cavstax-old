const Joi = require("@hapi/joi");

const regSchema = Joi.object({
    "firstName": Joi.string().required(),
    "middleName": Joi.string(),
    "lastName": Joi.string(),
    "email": Joi.string().required().email(),
    "password": Joi.string().required().min(3).max(26),  //setup min and max for password here and also regex
    "gender": Joi.string().required(),
    "mobileNo": Joi.number().required(),
});

function validateRegSchema(body) {
    const result = regSchema.validate(body, { abortEarly: false });
    return result.error;
}

const loginSchema = Joi.object({
    "email": Joi.string().required().min(5).email(),
    "password": Joi.string().required().min(3).max(26)  //setup min and max for password here and also regex})
});

function validateLoginSchema(body) {
    const result = loginSchema.validate(body, { abortEarly: false });
    return result.error;
}

const ResetPasswordSchema = Joi.object({
    token: Joi.string().required().min(6).max(6).alphanum(),
    userId: Joi.string().required().min(24).max(24).alphanum(),
    issuedAt: Joi.number().required()
});

function validateResetPasswordSchema(body) {
    const result = ResetPasswordSchema.validate(body, { abortEarly: false });
    return result.error;
}

//  used in routes
//  1: /resendActivation
//  2: /forgotPassword
const emailSchema = Joi.object({
    email: Joi.string().required().min(5).email()
});

function validateEmailSchema(body) {
    const result = emailSchema.validate(body, { abortEarly: false });
    return result.error;
}

module.exports.validateRegSchema = validateRegSchema;
module.exports.validateLoginSchema = validateLoginSchema;
module.exports.validateResetPasswordSchema = validateResetPasswordSchema;
module.exports.validateEmailSchema = validateEmailSchema;