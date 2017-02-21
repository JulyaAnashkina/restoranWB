var User = require('models/user').User;
var async = require('async');
var HttpError = require('../../error/index').HttpError;

exports.get = function (req, res) {
    res.render('registration');
};

exports.post = function (req, res, next) {
    var email = req.body.email;
    var username = req.body.username;
    var surname = req.body.surname;
    var phone = req.body.phone;
    var password = req.body.password;
    var address = req.body.address;

    async.waterfall([
        function (callback) {
            User.findOne({email: email}, callback);
        },
        function (user, callback) {
            if (user) {
                next(new HttpError(300, "Такой email уже зарегистрирован"));
            } else {
                user = new User({username: username, surname: surname, phone: phone, email: email,address: address, password: password});
                user.save(function (err) {
                    if (err) return callback(err);
                    res.end();
                });
            }
        }
    ], next);
};