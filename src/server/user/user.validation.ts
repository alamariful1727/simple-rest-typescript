import * as Joi from 'joi';

// user validation
export const newUserValidation = {
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
export const userIdValidation = {
  params: {
    uid: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  },
};
