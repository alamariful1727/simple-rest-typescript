"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
// user validation
exports.newUserValidation = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        sex: Joi.string()
            .valid(['female', 'male', 'other'])
            .required(),
        type: Joi.string()
            .valid(['admin', 'user'])
            .required(),
    },
};
exports.userIdValidation = {
    params: {
        uid: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    },
};
