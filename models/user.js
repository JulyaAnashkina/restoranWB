var HttpError = require('../error').HttpError;
var crypto = require('crypto');
var async = require('async');
var util = require('util');

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });


schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function (email, password, callback) {
    var User = this;
    async.waterfall([
        function (callback) {
            User.findOne({email: email}, callback);
        },
        function (user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new HttpError(401, "Пароль неверен"));
                }
            } else {
                callback(new HttpError(500, "Пользователь не найден"));
            }
        }
    ], callback);
};

/*schema.statics.registr = function (username, surname, phone, email,address, password, callback) {
    var User = this;
    async.waterfall([
        function (callback) {
            User.findOne({email: email}, callback);
        },
        function (user, callback) {
            if (user) {
                callback(new HttpError(300, "Такой email уже зарегистрирован"));
            } else {
                var user = new User({username: username, surname: surname, phone: phone, email: email,address: address, password: password});
                user.save(function (err) {
                    if (err) return callback(err);
                    callback(null, user);
                });
            }
        }
    ], callback);
};*/
exports.User = mongoose.model('User', schema);

