"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        lowercase: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});
var user = mongoose_1.model('scribbleUserList', userSchema);
exports.default = user;
