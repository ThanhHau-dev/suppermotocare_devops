const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Session = new Schema({
        session: String,
        session_username: String,
        session_gmail: String,
},
{ timestamps: true },
);

module.exports = mongoose.model('sessions', Session);