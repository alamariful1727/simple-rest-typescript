"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("./config/express");
var mongoose = require("mongoose");
var config = require("./config/config");
// make bluebird default Promise
Promise = require('bluebird');
// plugin bluebird promise in mongoose
mongoose.Promise = Promise;
// connect to mongo db
var mongoUri = config.mongo.local;
mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('error', function () {
    throw new Error("unable to connect to database: " + mongoUri);
});
// start server
express_1.default.listen(config.port, function () {
    console.info("server started on port " + config.port + " (" + config.env + ")");
});
module.exports = express_1.default;
