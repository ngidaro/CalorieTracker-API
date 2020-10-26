'use strict';

var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var Info = require('../../security/info');

var User = require('../../models/user');

router.patch('/calorietrackerinitialize-20200629', async function (req, res, next) {
    try {
        const superAdminUser = await getUser(next, 'Super', 'Admin', 'superadmin', 'p5145156481assword', 'ngidaro@hotmail.com');

        res.json(superAdminUser);

    }
    catch (err) {
        if (err) {
            console.error(err);
            return next(err);
        }
    }
});

var getUser = async function (next, firstname, lastname, password, email) {
    try {

        var user = await User.findOne({ email: email })
            .select('_id  password creationuser')
            .exec();
        if (!user) {
            user = new User();
            user.firstname = firstname;
            user.lastname = lastname;
            user.password = password;
            user.email = email;
            const encryptedpassword = await bcrypt.hash(password, Info.saltRounds);
            if (encryptedpassword) {
                user.password = encryptedpassword;
            }
            user.creationuser = user._id;
            user.modifieduser = user._id;
            var savedUser = await user.save();
            if (savedUser) {
                console.log('Generated user...');
                user = savedUser;
            } else {
                const err = 'Error saving';
                console.error(err);
            }
        }
        return user;
    }
    catch (err) {
        if (err) {
            console.error(err);
            return next(err);
        }
    }
}

module.exports = router;