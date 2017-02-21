var Dish = require('models/dish').Dish;
var Cart = require('models/cart').Cart;
var async = require('async');

exports.add = function (req, res, next) {
    var dishID =req.query.dishID;
    var count = req.query.count;
    var userID = req.session.user;
    if(userID != undefined) {
        if(count!=undefined) {
            async.waterfall([
                function(callback) {
                    Cart.findOne({userID: userID, dishID: dishID}, callback);
                },
                function(cart, callback) {
                    if (cart) {
                        cart.count= cart.get('count')+ Number(count);
                        callback(null,cart);
                    }else {
                        Dish.findOne({_id: dishID},  function (err, dish){
                            cart = new Cart({
                                userID: userID,
                                dishID: dishID,
                                dishname:dish.get('dishname'), category:dish.get('category'), price:dish.get('price'), count: count});
                            callback(null,cart);
                        });
                    }
                },
                function(cart) {
                    cart.save(function(err) {
                        if (err) { next(500); }
                        else { res.status(200).end(); }
                    });
                }
            ], next);
        }
        else { next(401).end(); }
    }
    else { next(402).end(); }
};