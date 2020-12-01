'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipename: {type: String, required: true},

    creationuser: { type: Schema.Types.ObjectId, ref: 'User' },
    creationdate: { type: Date, default: Date.now },
    modificationdate: { type: Date, default: Date.now },
    deletionuser: { type: Schema.Types.ObjectId, ref: 'User' },
    deletiondate: { type: Date }
});

module.exports = mongoose.model('Recipe', schema);