var User = require('models/user').User;
var Dish = require('models/dish').Dish;
var Cart = require('models/cart').Cart;
var Order = require('models/order').Order;
var HttpError = require('error').HttpError;
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {
    app.get('/', require('./home').get);
    app.get('/menu', require('./menu').get);
    app.get('/dish', require('./dish').get);
    app.get('/contacts', require('./contacts').get);

    app.get('/cart', require('./cart/getCart').get);
    app.get('/cart/addDish', require('./cart/addDish').add);
    app.get('/cart/deleteDish', require('./cart/deleteDish').delete);

    app.get('/order', require('./order').get);

    app.get('/login', require('./profile/login').get);
    app.post('/login', require('./profile/login').post);
    app.post('/exit', require('./profile/exit').post);

    app.get('/registration', require('./profile/registration').get);
    app.post('/registration', require('./profile/registration').post);
    /**************************TEST BD****************************/
    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) return next(err);
            res.json(users);
        })
    });
    app.get('/users/:id', function (req, res, next) {
        try {
            var id = new ObjectID(req.params.id);
        } catch (e) {
            return next(404);
        }
        User.findById(id, function (err, user) {
            if (err) return next(err);
            if (!user) {
                next(404);
            }
            res.json(user);
        });
    });

    app.get('/dishes', function (req, res, next) {
        Dish.find({}, function (err, dishes) {
            if (err) return next(err);
            res.json(dishes);
        })
    });
    app.get('/dishes/:id', function (req, res, next) {
        try {
            var id = new ObjectID(req.params.id);
        } catch (e) {
            return next(404);
        }
        Dish.findById(id, function (err, dish) {
            if (err) return next(err);
            if (!dish) {
                next(404);
            }
            res.json(dish);
        });
    });

    app.get('/carts', function (req, res, next) {
        Cart.find({}, function (err, carts) {
            if (err) return next(err);
            res.json(carts);
        })
    });
    app.get('/carts/:id', function (req, res, next) {
        try {
            var id = new ObjectID(req.params.id);
        } catch (e) {
            return next(404);
        }
        Cart.findById(id, function (err, cart) {
            if (err) return next(err);
            if (!cart) {
                next(404);
            }
            res.json(cart);
        });
    });

    app.get('/orders', function (req, res, next) {
        Order.find({}, function (err, orders) {
            if (err) return next(err);
            res.json(orders);
        })
    });
    app.get('/orders/:id', function (req, res, next) {
        try {
            var id = new ObjectID(req.params.id);
        } catch (e) {
            return next(404);
        }
        Order.findById(id, function (err, order) {
            if (err) return next(err);
            if (!order) {
                next(404);
            }
            res.json(order);
        });
    });
};
