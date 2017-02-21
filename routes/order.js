var Order = require('models/order').Order;
var Cart = require('models/cart').Cart;
var HttpError = require('../error').HttpError;

exports.get = function(req, res,next) {
    var userID = req.session.user;
    Cart.find({userID:userID},function (err, carts){
        if (err) { next(new HttpError(500,"Ошибка поиска заказа для пользователя")); }
        else {
            var order = new Order({cart:carts});
            order.save(function(err) {
                if (err) { next(new HttpError(500,"Ошибка сохранения заказа в БД")); }
            });
            Cart.remove({userID:userID},function (err) {
                if (err) { next(new HttpError(500,"Ошибка очищения корзины в БД")); }
                else {
                    res.status(200);
                    res.end();
                }
            });
        }
    });
};