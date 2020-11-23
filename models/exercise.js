'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true},

    exercisename: { type: String, required: true },
    caloriesburned: { type: Number, required: true },

    creationuser: { type: Schema.Types.ObjectId, ref: 'User' },
    creationdate: { type: Date, default: Date.now },
    modificationdate: { type: Date, default: Date.now },
    deletionuser: { type: Schema.Types.ObjectId, ref: 'User' },
    deletiondate: { type: Date }
});

module.exports = mongoose.model('Exercise', schema);