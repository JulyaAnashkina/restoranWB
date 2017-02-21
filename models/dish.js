var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schemaDish = new Schema({
    category: {
        type: String,
        required: true
    },
    dishname: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    composition: {
        type:  String,
        required: true
    },
    weight: {
        type: [Number],
        required: true
    }
});
exports.Dish = mongoose.model('Dish', schemaDish);

