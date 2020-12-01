var express = require('express');
var fetch = require('node-fetch')
var router = express.Router();

const { isAuthenticated } = require('../../security/authenticate');

var Ingredient = require('../../models/ingredient');

router.post('/', /* isAuthenticated */ async function ( req, res, next ){

    res.json("Good to go from ingredients");

});

router.post('/addingredient', /* isAuthenticated */ async function ( req, res, next ){

    console.log(req.body.recipe_id);

    try {

        var newIngredient = new Ingredient();
        newIngredient.userid = req.body.user_id;
        newIngredient.recipeid = req.body.recipe_id;
        newIngredient.amount = req.body.amount;
        newIngredient.servingsize = req.body.servingsize;
        newIngredient.fdcId = req.body.fdcId;
        newIngredient.fooddescription = req.body.description;
        newIngredient.brandowner = req.body.brandowner;
        newIngredient.energy = req.body.energy;
        newIngredient.protein = req.body.protein;
        newIngredient.carbohydrates = req.body.carbs;
        newIngredient.fat = req.body.fat;
        // newDiaryEntry.fiber = req.body.fiber;
        newIngredient.servingunits = req.body.servingunits;
        newIngredient.creationuser = req.body.user_id;

        var savedIngredient = await newIngredient.save();
        if (savedIngredient) {
            console.log('Generated new ingredient...');
            newIngredient = savedIngredient;
        } else {
            const err = 'Error saving';
            console.error(err);
        }

        res.statusCode = 200;
        res.json({ ingredient: newIngredient });
        
    } catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }
});

router.post('/getingredients', /* isAuthenticated */ async function ( req, res, next ){

    try {

        const ingredients = await Ingredient.find({recipeid: req.body.recipe_id})

        res.statusCode = 200;
        res.json({ ingredients: ingredients });
        
    } catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }
});

router.post('/deleteingredient', /* isAuthenticated */ async function ( req, res, next ){

    try {

        const ingredients = await Ingredient.deleteOne({_id: req.body.ingredient_id})

        res.statusCode = 200;
        res.json({ ingredients: ingredients });
        
    } catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }
});

module.exports = router;