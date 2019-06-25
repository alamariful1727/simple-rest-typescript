import { Router } from 'express';
import * as userCtlr from './user.controller';
const express = require('express');

const router: Router = express.Router();

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
