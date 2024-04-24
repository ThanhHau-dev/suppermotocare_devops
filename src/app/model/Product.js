const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Motos = new Schema(
    {
        name: String,
        type: String,
        distributed: String,
        price: Number,
        img: String,
    },
    { timestamps: true },
);

// Add plugins
mongoose.plugin(slug);
Motos.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('motos', Motos);
