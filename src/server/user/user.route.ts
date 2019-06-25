import { Router } from 'express';
import * as userCtlr from './user.controller';
const express = require('express');
const router: Router = express.Router();
const validate = require('express-validation');
import { newUserValidation, userIdValidation } from './user.validation';
router
  .route('/')
  .get(userCtlr.getAllUser)
  .post(validate(newUserValidation), userCtlr.addUser);
router
  .route('/:uid')
  .get(validate(userIdValidation), userCtlr.getUser)
  .put(validate(userIdValidation), userCtlr.updateUser)
  .delete(validate(userIdValidation), userCtlr.deleteUser);
module.exports = router;
