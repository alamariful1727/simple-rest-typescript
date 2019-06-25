'use strict';

import { Document, Schema, Model, model } from 'mongoose';
// defining all the fields of main user
export const userSchema: Schema = new Schema({
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

export interface IUser extends Document {
  name: string;
  email: string;
  type: string;
  sex: string;
}

// Export the model and return your IUser interface
export const User: Model<IUser> = model<IUser>('User', userSchema);
