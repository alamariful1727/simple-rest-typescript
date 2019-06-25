"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userCtlr = require("./user.controller");
var express = require('express');
var router = express.Router();
var validate = require('express-validation');
var user_validation_1 = require("./user.validation");
router
    .route('/')
    .get(userCtlr.getAllUser)
    .post(validate(user_validation_1.newUserValidation), userCtlr.addUser);
router
    .route('/:uid')
    .get(validate(user_validation_1.userIdValidation), userCtlr.getUser)
    .put(validate(user_validation_1.userIdValidation), userCtlr.updateUser)
    .delete(validate(user_validation_1.userIdValidation), userCtlr.deleteUser);
module.exports = router;
