var Dish = require('models/dish').Dish;
var HttpError = require('../error').HttpError;

exports.get = function (req, res, next) {
    var category = req.query.category;
    console.log("Считалось category:", category);
    var condition = {};
    if (category!=undefined) condition.category = category;
    Dish.find(condition, function (err, dishes) {
            if (err) {next(new HttpError(500, "Ошибка: поиска блюд в БД категории: " + category));}
            else {
                console.log("Считалось:");
                console.log(dishes.length);
                res.render('menu', {dishes: dishes, count: dishes.length})
            }
    });
};