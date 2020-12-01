var express = require('express');
var fetch = require('node-fetch')
var router = express.Router();

const { isAuthenticated } = require('../../security/authenticate');

var Recipe = require('../../models/recipe');

router.post('/', /* isAuthenticated */ async function ( req, res, next ){

    res.json("Good");

});

router.post('/addrecipe', /* isAuthenticated */ async function ( req, res, next ){

    var newRecipe = new Recipe();
    newRecipe.userid = req.body.user_id;
    newRecipe.recipename = req.body.recipename;
    
    var savedRecipe = await newRecipe.save();

    if (savedRecipe) {
        console.log('Generated Recipe...');
        newRecipe = savedRecipe;

        res.statusCode = 200;
        res.json({ _id: newRecipe._id });

    } else {
        const err = 'Error saving';
        console.error(err);
    }
    

});

router.post('/getrecipe', /* isAuthenticated */ async function ( req, res, next ){

    try{
    
        const recipe = await Recipe.findById(req.body.recipe_id); 

        res.statusCode = 200;
        res.json({ recipe: recipe });

    }catch(error){
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }

});

router.post('/getuserrecipes', /* isAuthenticated */ async function ( req, res, next ){

    try{
    
        const recipes = await Recipe.find({userid: req.body.user_id}); 

        res.statusCode = 200;
        res.json({ recipes: recipes });

    }catch(error){
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }

});

module.exports = router;