var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const bcrypt = require("bcryptjs");
var Info = require('../../security/info');

var User = require('../../models/user');

router.get('/', async function ( req, res, next ){
    // res.send('WASSUP FROM USER');
    res.json({"name": "name"});
})

router.post('/getuser', async function ( req, res, next ){
    
    const userData = await User.findOne({ _id: req.body._id })
            .exec();

    res.json({userdata: userData});
})

router.post('/login', async function (req, res, next) {

    try {
        const loginuser = await User.findOne({ username: req.body.username })
            .select('_id password username email')
            .exec();

        if (loginuser) {
            const passwordmatch = await bcrypt.compare(req.body.password, loginuser.password)
            if (passwordmatch) {
                //Create token payload
                const token = createToken(loginuser);
                res.statusCode = 200;
                res.json({ token: token, _id:loginuser._id });
            }
            else {
                const error = `Please check Email or Password.`
                res.statusCode = 400;
                res.json({ statuscode: res.statusCode, api: req.originalUrl, error: error });
            }
        }
        else {
            const error = `Please check Email or Password.`
            res.statusCode = 400;
            res.json({ statuscode: res.statusCode, api: req.originalUrl, error: error });
        }
    }
    catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }
});

function createToken(user) {
    const payload = {
        user_id: user._id,
        username: user.username,
        email: user.email,
    };

    return jwt.sign(payload, Info.secret);
}

router.post('/createaccount', async function (req, res, next) {
    try {
        const existinguser = await User.findOne({ username: req.body.username })
            .select('username')
            .exec();

        if (!existinguser) {
            var newUser = new User();
            newUser.username = req.body.username;
            newUser.password = req.body.password;
            newUser.email = req.body.email;
            const encryptedpassword = await bcrypt.hash(req.body.password, Info.saltRounds);
            if (encryptedpassword) {
                newUser.password = encryptedpassword;
            }
            var savedUser = await newUser.save();
            if (savedUser) {
                console.log('Generated user...');
                newUser = savedUser;

                res.statusCode = 200;
                res.json({ token: createToken(newUser), _id: newUser._id });

            } else {
                const err = 'Error saving';
                console.error(err);
            }

            // const token = createToken(newUser);
            // res.statusCode = 200;
            // res.json({ token: token, _id: newUser._id });
        }
        else{
            console.log("Username is already taken");
            res.json();
        }
    }
    catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }

});

router.post('/updateaccount', async function (req, res, next) {
    try {
        var updatedUser = await User.findOneAndUpdate({ "_id": req.body._id },
                                { "$set": { "gender": req.body.gender ,
                                            "age": req.body.age ,
                                            "height": req.body.height ,
                                            "weight": req.body.weight ,
                                            "targetweight":req.body.targetweight ,
                                            "activitylevel": req.body.activitylevel ,
                                            "proteinratio":req.body.proteinratio ,
                                            "carbsratio":req.body.carbsratio ,
                                            "fatratio":req.body.fatratio }})
            .select('_id')
            .exec();

        res.statusCode = 200;
        res.json({user: updatedUser});
    }
    catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }

});

module.exports = router;