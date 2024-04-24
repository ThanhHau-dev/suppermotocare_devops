const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    username: {type: String, unique: true},
    gmail: {type: String, unique: true},
    password: String,
    admin: { type: Boolean, default: false},
},
{ timestamps: true },
);

module.exports = mongoose.model('accounts', Account);