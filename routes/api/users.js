var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const bcrypt = require("bcryptjs");
var Info = require('../../security/info');

var User = require('../../models/user');
const user = require('../../models/user');

router.get('/', async function ( req, res, next ){
    // res.send('WASSUP FROM USER');
    res.json({"name": "name"});
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
                res.json({ token: token });
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
            .select('_id password username email')
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
            } else {
                const err = 'Error saving';
                console.error(err);
            }

            const token = createToken(newUser);
            res.statusCode = 200;
            res.json({ token: token });
        }
        else{
            console.log("Username is already taken");
        }
    }
    catch (error) {
        console.info(error);
        res.statusCode = 500;
        res.json({ statuscode: res.statusCode, api: req.originalUrl, error: `${error}` });
    }

});

module.exports = router;