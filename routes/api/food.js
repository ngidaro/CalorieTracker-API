var express = require('express');
var fetch = require('node-fetch')
var router = express.Router();
var API_KEY = "zsGhFEwjHoRwhrNxJqBaeUDuL237of0dpKxqQL6k"; // USDA

const { isAuthenticated } = require('../../security/authenticate');

var Diary = require('../../models/diary');

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
    console.log(json);
    res.json(json);

})

router.post('/savediary', /* isAuthenticated */ async function ( req, res, next ){

    try {

        console.log(req.body.user_id);

        var newDiaryEntry = new Diary();
            newDiaryEntry.userid = req.body.user_id;
            newDiaryEntry.date = Date.now(); // Will eventually change this to the date for the log
            // newDiaryEntry.date = req.body.date;
            newDiaryEntry.amount = req.body.amount;
            newDiaryEntry.servingsize = req.body.servingsize;
            newDiaryEntry.fdcId = req.body.fdcId;
            newDiaryEntry.fooddescription = req.body.description;
            newDiaryEntry.brandowner = req.body.brandowner;
            newDiaryEntry.energy = req.body.energy;
            newDiaryEntry.servingunits = req.body.servingunits;
            newDiaryEntry.creationuser = req.body.user_id;

            var savedDiaryEntry = await newDiaryEntry.save();
            if (savedDiaryEntry) {
                console.log('Generated new log...');
                newDiaryEntry = savedDiaryEntry;
            } else {
                const err = 'Error saving';
                console.error(err);
            }

            res.statusCode = 200;
            res.json({ diary: newDiaryEntry });
        
    } catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }
});

router.post('/getdiary', /* isAuthenticated */ async function ( req, res, next ){

    try {

        const userFoods = await Diary.find({ userid: req.body.user_id })

        res.statusCode = 200;
        res.json({ foodDiary: userFoods });
        
    } catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }
});

module.exports = router;