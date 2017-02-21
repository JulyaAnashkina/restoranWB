var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schemaCart = new Schema({
    userID: {
        type: String,
        required: true
    },
    dishID: {
        type: String,
        required: true
    },
    dishname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
exports.Cart = mongoose.model('Cart', schemaCart);