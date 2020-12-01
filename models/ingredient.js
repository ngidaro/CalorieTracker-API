'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    recipeid: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },

    amount: { type: Number, required: true },
    servingsize: { type: Number, required: true },
    fdcId: { type: String, required: true },
    fooddescription: { type: String, required: true },
    brandowner: { type: String, required: true },
    energy: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    fat: { type: Number, required: true },
    // fiber: { type: Number, required: true },
    servingunits: { type: String, required: true },

    creationuser: { type: Schema.Types.ObjectId, ref: 'User' },
    creationdate: { type: Date, default: Date.now },
    modificationdate: { type: Date, default: Date.now },
    deletionuser: { type: Schema.Types.ObjectId, ref: 'User' },
    deletiondate: { type: Date }
});

module.exports = mongoose.model('Ingredient', schema);