var Cart = require('models/cart').Cart;
var Good = require('models/dish').Dish;
exports.get = function (req, res, next) {
    var userID = req.session.user;
    Cart.find({userID: userID}, function (err, carts) {
        if (err) next(new HttpError(500, "Ошибка поиска корзины для пользователя в БД"));
        else res.render('cart', {dishes: carts});
    });
};