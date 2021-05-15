"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var config_1 = require("./config");
var PORT = config_1.config.PORT, MONGO_URI = config_1.config.MONGO_URI;
// express server
var server = express_1.default();
server.use(cors_1.default()); // cors middleware
server.use(body_parser_1.default.json()); // parser middleware
// mongo db connection
mongoose_1.default.connect("" + MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(function () {
    console.log("Mongodb connected Successfully");
})
    .catch(function (err) {
    console.log("Error while connecting mongodb " + err);
});
// server initialzing 
server.listen(PORT, function () {
    console.log("Server listening on PORT " + PORT);
});
