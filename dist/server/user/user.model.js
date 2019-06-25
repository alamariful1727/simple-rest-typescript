'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
// defining all the fields of main user
exports.userSchema = new mongoose.Schema({
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
exports.User = (module.exports = mongoose.model('User', exports.userSchema));
