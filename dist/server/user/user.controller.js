"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require('./user.model');
exports.getAllUser = function (req, res) {
    // get all User
    User.find()
        .exec()
        .then(function (users) {
        var response = {
            count: users.length,
            users: users.map(function (user) {
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    type: user.type,
                    sex: user.sex,
                };
            }),
        };
        res.status(200).json(response);
    })
        .catch(function (err) {
        res.status(500).json({
            error: err,
        });
    });
};
exports.getUser = function (req, res) {
    // get User
    User.findById(req.params.uid)
        .exec()
        .then(function (user) {
        var response = {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                sex: user.sex,
            },
        };
        res.status(200).json(response);
    })
        .catch(function (err) {
        res.status(500).json({
            error: err,
        });
    });
};
exports.addUser = function (req, res) {
    var _a;
    // Check for JSON
    if (!req.is('application/json')) {
        return res.send("Expects 'application/json'");
    }
    var name = (_a = req.body, _a.name), email = _a.email, type = _a.type, sex = _a.sex;
    var user = new User({
        name: name,
        email: email,
        type: type,
        sex: sex,
    });
    user
        .save()
        .then(function (user) {
        res.status(201).json({
            message: 'New user added.',
            createdUser: {
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                sex: user.sex,
            },
        });
    })
        .catch(function (err) {
        // console.log(err);
        res.status(500).json({
            error: err,
        });
    });
};
exports.updateUser = function (req, res) {
    // Check for JSON
    if (!req.is('application/json')) {
        return res.send("Expects 'application/json'");
    }
    User.findOneAndUpdate({ _id: req.params.uid }, req.body)
        .exec()
        .then(function (user) {
        if (user) {
            res.status(200).json({
                message: 'User updated.',
                request: {
                    type: 'GET',
                    url: "" + req.originalUrl,
                },
            });
        }
        else {
            res.status(400).json({
                message: "No user found to update.",
            });
        }
    })
        .catch(function (err) {
        res.status(500).json({
            error: err,
        });
    });
};
exports.deleteUser = function (req, res) {
    User.findByIdAndRemove({ _id: req.params.uid })
        .exec()
        .then(function (user) {
        if (user) {
            res.status(200).json({
                message: 'User deleted.',
            });
        }
        else {
            res.status(400).json({
                message: "No user found to delete.",
            });
        }
    })
        .catch(function (err) {
        res.status(500).json({
            error: err,
        });
    });
};
