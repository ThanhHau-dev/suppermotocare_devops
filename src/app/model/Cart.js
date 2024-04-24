const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        priceProduct: Number,
        imgProduct: String,
        productName: String,
        quantity: Number,
        customerName: String,
    },
    { timestamps: true },
);

// Add plugins
mongoose.plugin(slug);
Cart.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('carts', Cart);
