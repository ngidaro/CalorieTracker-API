var express = require('express');
var fetch = require('node-fetch')
var router = express.Router();

const { isAuthenticated } = require('../../security/authenticate');

var Exercise = require('../../models/exercise');

router.post('/', /* isAuthenticated */ async function ( req, res, next ){
    
    res.send("GOOD TO GO");

});

router.post('/addexercise', /* isAuthenticated */ async function ( req, res, next ){

    //--------- Convert Date to UTC ---------

    const date = dateUTC(req.body.date);

    try {

        var newExerciseEntry = new Exercise();
            newExerciseEntry.userid = req.body.user_id;
            newExerciseEntry.date = date;
            newExerciseEntry.exercisename = req.body.exercisename;
            newExerciseEntry.caloriesburned = req.body.caloriesburned;
            newExerciseEntry.creationuser = req.body.user_id;

            var savedExerciseEntry = await newExerciseEntry.save();
            if (savedExerciseEntry) {
                console.log('Generated new log...');
                newExerciseEntry = savedExerciseEntry;
            } else {
                const err = 'Error saving';
                console.error(err);
            }

            res.statusCode = 200;
            res.json({ exercise: newExerciseEntry });
        
    } catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }
});

router.post('/getexercise', /* isAuthenticated */ async function ( req, res, next ){

    const date = dateUTC(new Date (req.body.date));

    const rangeddate = new Date(date);

    rangeddate.setUTCHours(0);
    rangeddate.setUTCMinutes(0);
    rangeddate.setUTCSeconds(0);
    rangeddate.setUTCMilliseconds(0);

    try {

        const userExercises = await Exercise.find({ userid: { $in: req.body.user_id },
                                        "date": {"$gte": rangeddate,
                                        "$lt":new Date(rangeddate).setDate(new Date(rangeddate).getDate()+1)} })

        res.statusCode = 200;
        res.json({ exercise: userExercises });
        
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