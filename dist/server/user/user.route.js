"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userCtlr = require("./user.controller");
var express = require('express');
var router = express.Router();
router
    .route('/')
    .get(userCtlr.getAllUser)
    .post(userCtlr.addUser);
router
    .route('/:uid')
    .get(userCtlr.getUser)
    .put(userCtlr.updateUser)
    .delete(userCtlr.deleteUser);
module.exports = router;
