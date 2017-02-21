var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var HttpError = require('error').HttpError;

var log = require('libs/log')(module);
var config = require('./config');
var mongoose = require('libs/mongoose');

//создаем приложение, создает функцию которая обрабатывает запросы
var app = express();

// view engine setup  Настройка движка
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
/*
app.use(require('middleware/sendHttpError'));*/
app.use(require('middleware/loadUser'));
require('./routes')(app);

// catch 404 and forward to error handler
 app.use(function (req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });
 // error handler  обработчик ошибок
 app.use(function (err, req, res, next) {
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};

 // render the error page  отобразить страницу ошибки
 res.status(err.status || 500);
 res.render('error');
 });
/*app.use(function (err, req, res, next) {
    if (typeof err == 'number') {
        err = new HttpError(err);
    }
    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            express.errorHandler()(err, req, res, next);
        } else {
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});*/

module.exports = app;
