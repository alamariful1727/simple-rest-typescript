"use strict";
var Joi = require("joi");
require('dotenv').config();
// define validation for all the env vars
var envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    PORT: Joi.number().default(4040),
    MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
        is: Joi.string().equal('development'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false),
    }),
    JWT_SECRET: Joi.string()
        .required()
        .description('JWT Secret required to sign'),
    MONGO_HOST: Joi.string()
        .required()
        .description('Mongo DB host url'),
    MONGO_HOST_LOCAL: Joi.string()
        .required()
        .description('Mongo DB local host url'),
    MONGO_PORT: Joi.number().default(27017),
})
    .unknown()
    .required();
var _a = Joi.validate(process.env, envVarsSchema), error = _a.error, envVars = _a.value;
if (error) {
    throw new Error("Config validation error: " + error.message);
}
module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    jwtSecret: envVars.JWT_SECRET,
    mongo: {
        local: envVars.MONGO_HOST_LOCAL,
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT,
    },
};
