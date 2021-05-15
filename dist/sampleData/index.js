"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleData = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userOne = mongoose_1.default.Types.ObjectId();
var userTwo = mongoose_1.default.Types.ObjectId();
exports.sampleData = {
    user: [
        {
            _id: userOne,
            email: "sujith@gmail.com",
            password: "password123"
        },
        {
            _id: userTwo,
            email: "hello@gmail.com",
            password: "password123"
        }
    ],
    notes: [
        {
            userID: userOne,
            title: "Fullstack application using typescript",
            content: "step 1 : installation"
        },
        {
            userID: userOne,
            title: "Next.js application setup",
            content: "step 1 : installation"
        }
    ]
};
