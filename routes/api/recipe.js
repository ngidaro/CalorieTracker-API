var express = require('express');
var fetch = require('node-fetch')
var router = express.Router();

const { isAuthenticated } = require('../../security/authenticate');

var Recipe = require('../../models/recipe');

router.post('/', /* isAuthenticated */ async function ( req, res, next ){

    res.json("Good");

});