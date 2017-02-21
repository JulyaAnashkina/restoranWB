var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schemaOrder = new Schema({
    cart: {
        type: [
            {
                userID: {
                    type: String,
                    required: true
                },
                dishID: {
                    type: String,
                    required: true
                },
                count: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Order = mongoose.model('Order', schemaOrder);