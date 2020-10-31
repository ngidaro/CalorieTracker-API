'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    creationuser: { type: Schema.Types.ObjectId, ref: 'User' },
    creationdate: { type: Date, default: Date.now },
    deletionuser: { type: Schema.Types.ObjectId, ref: 'User' },
    deletiondate: { type: Date }
});

module.exports = mongoose.model('User', schema);