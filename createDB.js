var mongoose = require('libs/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModelsDish,
    createDish,
    requireModelsUser,
    createUsers,
    requireModelsCart,/*
     createCart*/
    requireModelsOrder/*,
     createOrder*/
], function (err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

//открывает соединение
function open(callback) {
    mongoose.connection.on('open', callback);
}
//убивает БД
function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModelsDish(callback) {
    require('models/dish');

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}
function requireModelsUser(callback) {
    require('models/user');

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}
function requireModelsCart(callback) {
    require('models/cart');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}
function requireModelsOrder(callback) {
    require('models/order');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createDish(callback) {
    var dishes = [
        {category: 'Салаты', dishname: 'ЦЕЗАРЬ С КУРИЦЕЙ', price: 300, composition: 'салатный микс, соус «Цезарь», сухарики, куриное филе, сыр Пармезан, яйца перепелиные, помидоры черри, бекон.', weight: 250},
        {category: 'Салаты', dishname: 'ЦЕЗАРЬ С КРЕВЕТКАМИ', price: 420, composition: 'салатный микс, соус «Цезарь», сухарики, креветки тигровые, сыр Пармезан, яйца перепелиные, помидоры черри.', weight: 250},
        {category: 'Салаты', dishname: 'САЛАТ ИЗ ТЕЛЯТИНЫ И ПЕЧЕНЫХ ОВОЩЕЙ', price: 350, composition: 'телятина, лист салата, морковь, болгарский перец, свекла, грецкий орех, кунжут.', weight: 250},
        {category: 'Салаты', dishname: 'ТЕПЛЫЙ САЛАТ С ПЕЧЕНЬЮ', price: 300, composition: 'куриная печень, яблоки, болгарский перец, лист салата.', weight: 250},
        {category: 'Салаты', dishname: 'ФИТНЕС САЛАТ', price: 250, composition: 'микс салат, яблоки, морковь, болгарский перец, грецкий орех, сметана, курага.', weight: 200},
        {category: 'Салаты', dishname: 'САЛАТ С КУРИНОЙ ГРУДКОЙ', price: 300, composition: 'куриное филе, морковь, помидоры черри, болгарский перец, кунжут, лист салата.', weight: 200},
        {category: 'Салаты', dishname: 'САЛАТ ПО-ДЕРЕВЕНСКИ', price: 230, composition: 'салатный микс, бекон, картофель, помидор, лук.', weight: 250},
        {category: 'Салаты', dishname: 'САЛАТ МЯСНОЙ', price: 200, composition: 'язык говяжий, куриное филе, буженина, корнишоны, морковь, картофель, сметана, майонез.', weight: 200},
        {category: 'Салаты', dishname: 'САЛАТ С ТЕЛЯТИНОЙ', price: 350, composition: 'телятина, салатный микс, баклажан, цукини, сельдерей, имбирь, помидоры черри, орех кедровый, зелень.', weight: 250},
        {category: 'Салаты', dishname: 'ГРЕЧЕСКИЙ', price: 380, composition: 'огурец, помидор, перец болгарский, маслины, оливки, сыр Фетакса, орех грецкий, салатный микс, зелень.', weight: 250},

        {category: 'Супы', dishname: 'КРЕМ-СУП СЫРНЫЙ', price: 250, composition: 'куриное филе, ветчина, сыр Виола, помидоры черри, лук, морковь, сухарики.', weight: 300},
        {category: 'Супы', dishname: 'СУП-ПЮРЕ ГОРОХОВЫЙ С БЕКОНОМ', price: 170, composition: 'бекон, горошек, сливки, лук, морковь, сухарики.', weight: 300},
        {category: 'Супы', dishname: 'КРЕМ-СУП ИЗ ШАМПИНЬОНОВ', price: 210, composition: 'куриное филе, шампиньоны свежие, лук, морковь, сухарики.', weight: 300},
        {category: 'Супы', dishname: 'УХА ИЗ ЛОСОСЯ', price: 300, composition: 'лосось,  морковь, болгарский перец, зелень, лук порей.', weight: 300},
        {category: 'Супы', dishname: 'СОЛЯНКА', price: 200, composition: 'лук, корнишоны, томатная паста, бекон, язык, говядина, сыр Пармезан, сметана, лимон, зелень.', weight: 300},
        {category: 'Супы', dishname: 'СУП С ПОТРОШКАМИ', price: 170, composition: 'куриная печень, фетучини,  болгарский перец, морковь, зелень, сметана.', weight: 300},

        {category: 'Паста', dishname: 'СПАГЕТТИ КАРБОНАРА', price: 240, composition: 'паста, бекон, яйца перепелиные, помидоры черри, сыр Пармезан, сливки, зелень.', weight: 300},
        {category: 'Паста', dishname: 'СПАГЕТТИ БОЛОНЬЕЗЕ', price: 280, composition: 'спагетти, фарш говяжий,  вино белое, томатная паста, сыр Пармезан.', weight: 250},
        {category: 'Паста', dishname: 'ФЕТУЧИНИ ДИ ПОЛО', price: 240, composition: 'паста, куриное филе, соус песто, прованские травы, сыр Пармезан, помидоры черри, сметана.', weight: 300},
        {category: 'Паста', dishname: 'ФЕТУЧИНИ С СЕМГОЙ', price: 450, composition: 'фетучини, семга, сливки , помидоры черри, сыр Пармезан.', weight: 250},
        {category: 'Паста', dishname: 'ТАЛЬЯТЕЛЛЕ С ГРИБАМИ', price: 240, composition: 'тальятелле, шампиньоны, сливки, сыр Пармезан, зелень.', weight: 250},
        {category: 'Паста', dishname: 'РИЗОТТО С БЕЛЫМИ ГРИБАМИ', price: 280, composition: 'рис арборио, лук, опята, куринная рудка, шампиньоны, вино белое, сыр Пармезан, лук, помидоры черри, зелень.', weight: 250},
        {category: 'Паста', dishname: 'РИЗОТТО С КУРИЦЕЙ', price: 320, composition: 'рис арборио, лук, опята, белые грибы, шампиньоны, вино белое, сыр Пармезан, лук, помидоры черри, зелень.', weight: 250},
        {category: 'Паста', dishname: 'ПОЛЬПЕТТЕ С ТЕЛЯЧЬИМ ЯЗЫКОМ', price: 300, composition: 'телячий язык, картофель, помидоры черри, шампиньоны, сливки, сыр Пармезан, зелень.', weight: 250},

        {category: 'Мясное', dishname: 'БАВАРСКИЕ КОЛБАСКИ', price: 330, composition: 'колбаски свиные, колбаски говяжьи, помидоры черри, горчица дижонская, кисло-сладкий соус.', weight: 250},
        {category: 'Мясное', dishname: 'ШАШЛЫК ИЗ КУРИЦЫ С СОУСОМ ТЕРИЯКИ', price: 300, composition: 'куриное филе, соус терияки, соус бербекю, лук маринованный, зелень.', weight: 240},
        {category: 'Мясное', dishname: 'ШАШЛЫК ИЗ СВИНОЙ ВЫРЕЗКИ', price: 450, composition: 'свинина вырезка, соус барбекю, лук маринованный, зелень.', weight: 250},
        {category: 'Мясное', dishname: 'ШАШЛЫК ИЗ СВИНОГО ОШЕЙКА', price: 450, composition: 'свинина вырезка, соус барбекю, лук маринованный, зелень.', weight: 250},
        {category: 'Мясное', dishname: 'РУЛЕТ ИЗ СВИНИНЫ', price: 380, composition: 'корейка без кости, помидоры, соус песто, лист салата, бекон, помидоры черри.', weight: 240},
        {category: 'Мясное', dishname: 'РАТАТУЙ С ТЕЛЯТИНОЙ', price: 270, composition: 'телятина, баклажан, цукини, лук репчатый, помидор, морковь, соус “песто”,зелень.', weight: 220},
        {category: 'Мясное', dishname: 'СВИНИНА НА КОСТИ', price: 350, composition: 'свинина на кости, помидоры черри, горчица дижонская, салатный микс, соус барбекю.', weight: 240},
        {category: 'Мясное', dishname: 'РЕБРА СВИННЫЕ', price: 400, composition: 'ребра свинные, салатный микс, лук маринованный, соус барбекю.', weight: 270},
        {category: 'Мясное', dishname: 'ФИЛЕ ИНДЕЙКИ ПОД КЛЮКВЕННЫМ СОУСОМ', price: 400, composition: 'филе индейки, соус клюквенный, салатный микс, зелень.', weight: 220},
        {category: 'Мясное', dishname: 'СКОВОРОДА С МЯСОМ И ОВОЩАМИ', price: 450, composition: 'свинина вырезка, говядина филе, куриное филе, картофель айдахо, помидор, шампиньоны, сыр Голландский, сливки, зелень.', weight: 300},
        {category: 'Мясное', dishname: 'МЕДАЛЬОНЫ ИЗ ТЕЛЯТИНЫ', price: 600, composition: 'телятина, картофель, лист салата, помидоры черри, сливки, сыр плавленый.', weight: 250},
        {category: 'Мясное', dishname: 'РУЛЬКА СВИНАЯ', price: 700, composition: 'свинная рулька, лук, капуста квашеная.', weight: 900},

        {category: 'Гарниры', dishname: 'ОВОЩИ ГРИЛЬ', price: 200, composition: 'салатный микс, баклажан, цукини, лук, помидоры черри, шампиньоны, чеснок, перец болг., зелень.', weight: 200},
        {category: 'Гарниры', dishname: 'КАРТОФЕЛЬ ЖАРЕНЫЙ С ГРИБАМИ', price: 150, composition: 'картофель, шампиньоны, бекон, сыр, зелень.', weight: 180},
        {category: 'Гарниры', dishname: 'СТРУЧКОВАЯ ФАСОЛЬ В ПРЯНОМ СОУСЕ', price: 150, composition: 'стручковая фасоль, сливки, лист салата, зелень, помидоры черри.', weight: 200},
        {category: 'Гарниры', dishname: 'ШАМПИНЬОНЫ ЖАРЕНЫЕ', price: 150, composition: 'шампиньоы.', weight: 150},
        {category: 'Гарниры', dishname: 'ШПИНАТ С ОВОЩАМИ', price: 150, composition: 'шпинат, лук репчатый, морковь, сливки, лист салата, зелень.', weight: 200},
        {category: 'Гарниры', dishname: 'РИС С ПАРМЕЗАНОМ', price: 150, composition: 'рис арборио, сливки, пармезан, лист салата, зелень.', weight: 150},
        {category: 'Гарниры', dishname: 'КАРТОФЕЛЬ ФРИ', price: 100, composition: 'картофель.', weight: 150},
        {category: 'Гарниры', dishname: 'КАРТОФЕЛЬ «АЙДАХО»', price: 180, composition: 'картофель.', weight: 150},

        {category: 'Десерты', dishname: 'ФРУКТОВЫЙ САЛАТ ПОД БЕЛЫМ ВЕРМУТОМ', price: 180, composition: 'киви, банан, ананас, апельсин, клубника, мята, вермут.', weight: 180},
        {category: 'Десерты', dishname: 'ЯБЛОЧНЫЙ ТАР-ТАТЕН', price: 240, composition: 'слоеное тесто, яблоки, мороженое, сливки взбитые.', weight: 200},
        {category: 'Десерты', dishname: 'ШТРУДЕЛЬ КЛАССИЧЕСКИЙ', price: 150, composition: 'вишня, миндаль, мята.', weight: 200},
        {category: 'Десерты', dishname: 'БАНАНОВЫЙ СПЛИТ', price: 200, composition: 'банан, сливки взбитые, мята.', weight: 200},
        {category: 'Десерты', dishname: 'ШОКОЛАДНЫЙ ФОНДАНТ', price: 220, composition: 'классический фондант с шариком мороженого.', weight: 140},
        {category: 'Десерты', dishname: 'ЧИЗКЕЙК', price: 150, composition: 'сливочный сыр, сахар, яйца, сливки, фрукты, печенье.', weight: 150},
        {category: 'Десерты', dishname: 'МОРОЖЕНОЕ', price: 150, composition: 'пломбир, топинг, мята.', weight: 150},
        {category: 'Десерты', dishname: 'МОЛОЧНЫЕ КОКТЕЛИ', price: 150, composition: 'молоко, пломбир, топинг.', weight: 300},

        {category: 'Суши', dishname: 'РОЛЛ «ВИНЕГРЕТ»', price: 360, composition: 'угорь унаги, лосось, тобико, сыр Моцарела, огурец.', weight: 300},
        {category: 'Суши', dishname: 'ФИЛАДЕЛЬФИЯ', price: 250, composition: 'рис, нори, сыр филадельфия, огурец, лосось.', weight: 235},
        {category: 'Суши', dishname: 'КАЛИФОРНИЯ', price: 250, composition: 'рис, нори, мясо краба, огурец, майонез, тобико.', weight: 225},
        {category: 'Суши', dishname: 'КУНСЕЙ BLACK', price: 250, composition: 'рис, нори, сыр филадельфия, лосось х/к, тобико.', weight: 210},
        {category: 'Суши', dishname: 'ДОМИНО', price: 250, composition: 'рис, нори, сыр филадельфия, огурец, лосось, угорь, кунжут.', weight: 220},
        {category: 'Суши', dishname: 'КАНАДА', price: 240, composition: 'рис, нори, сыр филадельфия, огурец, лосось х/к, угорь, кунжут.', weight: 240},
        {category: 'Суши', dishname: 'ФИЛАДЕЛЬФИЯ ЭБИ', price: 300, composition: 'рис, нори, сыр филадельфия, огурец, креветка, лосось.', weight: 240},
        {category: 'Суши', dishname: 'МОКО', price: 300, composition: 'рис, нори, сыр филадельфия, лосось, икра красная.', weight: 235},
        {category: 'Суши', dishname: 'САМУРАЙ', price: 300, composition: 'рис, нори, сыр филадельфия, угорь, лосось, тобико.', weight: 220},
        {category: 'Суши', dishname: 'КАЛИФОРНИЯ BLACK', price: 300, composition: 'рис, нори, майонез, мясо краба, угорь, лосось, огурец, тобико.', weight: 230},
        {category: 'Суши', dishname: 'ЧИЗ УГОРЬ', price: 300, composition: 'нори, сыр филадельфия, угорь, кунжут, соус унаги.', weight: 220},
        {category: 'Суши', dishname: 'АБУРО', price: 300, composition: 'рис, нори, сыр филадельфия, лосось, креветка, тобико,  сыр пармезан, соус спайси.', weight: 270},
        {category: 'Суши', dishname: 'МАРИОКА', price: 300, composition: 'рис, нори, сыр филадельфия, мясо краба, угорь, сыр пармезан, соус спайси.', weight: 230},
        {category: 'Суши', dishname: 'КИОТО', price: 300, composition: 'рис, нори, сыр филадельфия, креветка, тобико, сыр пармезан, соус спайси.', weight: 240},
        {category: 'Суши', dishname: 'АЗУМИ', price: 300, composition: 'сыр, нори, сыр филадельфия, угорь, лосось, кунжут, сыр пармезан, спайси соус.', weight: 245},
        {category: 'Суши', dishname: 'УНАГИ МАКИ', price: 200, composition: 'рис, огурец, угорь, соус унаги, кунжут.', weight: 120},
        {category: 'Суши', dishname: 'СЯКЕ МАКИ', price: 150, composition: 'рис, лосось.', weight: 110},
        {category: 'Суши', dishname: 'ТОБИ МАКИ', price: 150, composition: 'рис, тобико.', weight: 110}
    ];

    async.each(dishes, function(dishData, callback) {
        var dish = new mongoose.models.Dish(dishData);
        dish.save(callback);
    }, callback);
}
function createUsers(callback) {
    var users = [
        {email: 'vas98@ya.ru', username: 'Вася', surname: 'Петечкин', phone: '79045896124', address: 'Щорса 2а', password: '147'},
        {email: 'petr@ya.ru', username: 'Петя', surname: 'Иванов', phone: '79045696124', address: 'Губкина 45', password: '123'},
        {email: 'admin31@ya.ru', username: 'admin', surname: 'admin', phone: '79045894724', address: 'Садовая 26', password: '1995'}
    ];

    async.each(users, function (userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback)
    }, callback);
}
function createCart(callback) {

    var carts = [
        {userID: '5873980cc66d421470c81524', dishID: '5873980cc66d421470c814db',portion:'1', count: '100'}
    ];

    async.each(carts, function(userData, callback) {
        var cart = new mongoose.models.Cart(userData);
        cart.save(callback);
    }, callback);
}
function createOrder(callback) {
    var carts = [
        {userID: '585bca9869b0f01478ae5fde',dishID: '585bca9769b0f01478ae5fb7', portion: '52', count: '1'}
    ];
    var orders = [
        { cart: carts}
    ];

    async.each(orders, function(userData, callback) {
        var order = new mongoose.models.Order(userData);
        order.save(callback);
    }, callback);
}