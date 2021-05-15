"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var notesSchema = new mongoose_1.Schema({
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'scribbleUserList'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
var notes = mongoose_1.model('scribbleNotes', notesSchema);
exports.default = notes;
