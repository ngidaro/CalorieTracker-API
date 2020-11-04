'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, required: true},

    amount: { type: Number, required: true },
    servingsize: { type: Number, required: true },
    fdcId: { type: String, required: true },
    fooddescription: { type: String, required: true },
    brandowner: { type: String, required: true },
    energy: { type: Number, required: true },

    creationuser: { type: Schema.Types.ObjectId, ref: 'User' },
    creationdate: { type: Date, default: Date.now },
    modificationdate: { type: Date, default: Date.now },
    deletionuser: { type: Schema.Types.ObjectId, ref: 'User' },
    deletiondate: { type: Date }
});

module.exports = mongoose.model('Diary', schema);