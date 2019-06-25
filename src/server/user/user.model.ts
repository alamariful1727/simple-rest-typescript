'use strict';

import * as mongoose from 'mongoose';

// defining all the fields of main user
export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  },
  sex: {
    type: String,
    required: true,
    enum: ['female', 'male', 'other'],
  },
});

// userSchema.plugin(timestamp);

export const User = (module.exports = mongoose.model('User', userSchema));
