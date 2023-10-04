const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Borrowingrequest = require('./borrowingrequest');
const Book = require('./book');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    watchlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }],
    readBooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }],
    requestlog: [{
        type: Schema.Types.ObjectId,
        ref: 'Borrowingrequest',
    }]
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
