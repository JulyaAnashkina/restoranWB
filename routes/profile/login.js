var User = require('models/user').User;
var HttpError = require('../../error/index').HttpError;

exports.get = function (req, res) {
    res.render('login');
};

exports.post = function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.authorize(email, password, function(err, user) {
        if (err) {
            next(new HttpError(401,"Ошибка авторизации"));
        }
        else {
            console.log("успешный вход");
            req.session.user = user._id;
            res.end();
        }
    });
};