"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var index_route_1 = require("../index.route");
var config = require("./config");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var helmet = require("helmet");
var cors = require("cors");
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        if (config.env === 'development') {
            this.express.use(logger('dev'));
        }
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        this.express.use(cookieParser());
        // secure apps by setting various HTTP headers
        this.express.use(helmet());
        // enable CORS - Cross Origin Resource Sharing
        this.express.use(cors());
    };
    App.prototype.routes = function () {
        this.express.get('/', function (req, res, next) {
            res.send('Typescript App works!!');
        });
        // user route
        this.express.use('/api/v1', index_route_1.default);
        // handle undefined routes
        this.express.use('*', function (req, res, next) {
            res.send('Make sure url is correct!!!');
        });
    };
    return App;
}());
exports.default = new App().express;
