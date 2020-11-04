var express = require('express');
var fetch = require('node-fetch')
var router = express.Router();
var API_KEY = "zsGhFEwjHoRwhrNxJqBaeUDuL237of0dpKxqQL6k"; // USDA

const { isAuthenticated } = require('../../security/authenticate');

// var Food = require('../../models/food');

router.post('/', /* isAuthenticated */ async function ( req, res, next ){

    // const api_url = (`https://api.nal.usda.gov/fdc/v1/food/559594?api_key=zsGhFEwjHoRwhrNxJqBaeUDuL237of0dpKxqQL6k`);
    const api_url = (`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${req.body.search}`);
    
    const response = await fetch(api_url);
    const json = await response.json();
    // console.log(json);
    res.json(json);

});

router.post('/fooddata', /* isAuthenticated */ async function ( req, res, next ){

    const api_url = (`https://api.nal.usda.gov/fdc/v1/food/${req.body.fdcId}?api_key=${API_KEY}`);
    
    const response = await fetch(api_url);
    const json = await response.json();
    // console.log(json);
    res.json(json);

})

module.exports = router;