'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// defining all the fields of main user
exports.userSchema = new mongoose_1.Schema({
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
// Export the model and return your IUser interface
exports.User = mongoose_1.model('User', exports.userSchema);
