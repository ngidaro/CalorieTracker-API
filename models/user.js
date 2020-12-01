'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },

    gender: { type: String, required: false },
    age: { type: Number, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    weightlossweekly: { type: Number, required: false },
    activitylevel: { type: String, required: false },

    proteinratio: { type: Number, required: false },
    carbsratio: { type: Number, required: false },
    fatratio: { type: Number, required: false },

    creationuser: { type: Schema.Types.ObjectId, ref: 'User' },
    creationdate: { type: Date, default: Date.now },
    deletionuser: { type: Schema.Types.ObjectId, ref: 'User' },
    deletiondate: { type: Date }
});

module.exports = mongoose.model('User', schema);