var Dish = require('models/dish').Dish;
var HttpError = require('../error').HttpError;

exports.get = function (req, res, next) {
    var dishname = req.query.dishname;
    Dish.findOne({dishname: dishname}, function (err, dish) {
        if (err) next(new HttpError(500, "Ошибка поиска блюда в БД с именем:" + dishname));
        else res.render('dish', {dish: dish});
    });
};