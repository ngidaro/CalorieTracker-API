var express = require('express');
var router = express.Router();

/* GET API page. */
router.get('/', function (req, res, next) {
    res.json({name: 'WASSUP'});
    // res.send('WASSUP');
});

module.exports = router;