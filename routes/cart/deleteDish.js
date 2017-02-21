var Cart = require('models/cart').Cart;
var async = require('async');

exports.delete = function (req, res, next) {
    var userID = req.session.user;
    var dishID =req.query.dishID;

    async.waterfall([
        function(callback) {
            Cart.findOne({userID: userID, dishID: dishID}, callback);
        },
        function(cart, callback) {
            if (cart) {
                Cart.remove({userID: userID, dishID: dishID}, function (err) {
                    if (err)  callback(err);
                    else callback(null);
                });
            }
        }], function (err) {
        if (err) next(err);
        else res.redirect('/cart');
    });
};