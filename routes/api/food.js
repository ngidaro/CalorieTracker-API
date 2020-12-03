var express = require('express');
var fetch = require('node-fetch')
var router = express.Router();
var API_KEY = "zsGhFEwjHoRwhrNxJqBaeUDuL237of0dpKxqQL6k"; // USDA

const { isAuthenticated } = require('../../security/authenticate');

var Diary = require('../../models/diary');

router.post('/', /* isAuthenticated */ async function ( req, res, next ){

    // const api_url = (`https://api.nal.usda.gov/fdc/v1/food/559594?api_key=zsGhFEwjHoRwhrNxJqBaeUDuL237of0dpKxqQL6k`);
    const api_url = (`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${req.body.search}&dataType=Branded`);
    
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

    //--------- Convert Date to UTC ---------

    const date = dateUTC(req.body.date);

    try {

        var newDiaryEntry = new Diary();
            newDiaryEntry.userid = req.body.user_id;
            newDiaryEntry.date = date; // Will eventually change this to the date for the log
            // newDiaryEntry.date = req.body.date;
            newDiaryEntry.amount = req.body.amount;
            newDiaryEntry.servingsize = req.body.servingsize;
            newDiaryEntry.fdcId = req.body.fdcId;
            newDiaryEntry.fooddescription = req.body.description;
            newDiaryEntry.brandowner = req.body.brandowner;
            newDiaryEntry.energy = req.body.energy;
            newDiaryEntry.protein = req.body.protein;
            newDiaryEntry.carbohydrates = req.body.carbs;
            newDiaryEntry.fat = req.body.fat;
            // newDiaryEntry.fiber = req.body.fiber;
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

    const date = dateUTC(new Date (req.body.date));

    const rangeddate = new Date(date);

    rangeddate.setUTCHours(0);
    rangeddate.setUTCMinutes(0);
    rangeddate.setUTCSeconds(0);
    rangeddate.setUTCMilliseconds(0);

    try {

        const userFoods = await Diary.find({ userid: { $in: req.body.user_id },
                                        "date": {"$gte": rangeddate,
                                        "$lt":new Date(rangeddate).setDate(new Date(rangeddate).getDate()+1)} })

        console.log(userFoods);

        res.statusCode = 200;
        res.json({ foodDiary: userFoods });
        
    } catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }
});

function dateUTC(date){

    const newdate = new Date(date)

    newdate.setUTCFullYear(new Date(date).getFullYear());
    // console.log("1 :" + date);
    newdate.setUTCMonth(new Date(date).getMonth());
    // console.log("2 :" + date);
    newdate.setUTCDate(new Date(date).getDate());
    // console.log("3 :" + date);
    newdate.setUTCHours(new Date(date).getHours());
    // console.log("4 :" + date);
    newdate.setUTCMinutes(new Date(date).getMinutes());
    // console.log("5 :" + date);
    newdate.setUTCSeconds(new Date(date).getSeconds());
    // console.log("6 :" + date);
    newdate.setUTCMilliseconds(new Date(date).getMilliseconds());
    // console.log("7 :" + date);){

    return newdate;
}

module.exports = router;