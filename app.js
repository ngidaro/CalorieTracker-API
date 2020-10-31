const express = require('express');
const bodyParser = require('body-parser');
var Info = require('./security/info');
var cors = require('cors');

const app = express();

/**
 *  App Configuration
 */
var config = { "mongodb": "mongodb://localhost:27017/database-" + Info.app.code }; // Used for local mongoDB
var MONGODB_URL = 'mongodb+srv://dbCoen390:coen390team11@cluster0.q2vqt.mongodb.net/CalorieTracker?retryWrites=true&w=majority'
if (process && process.env && process.env.MONGO_USER && process.env.MONGO_HOST) {
  config = {
    "mongo": {
      "user": process.env.MONGO_USER,
      "host": process.env.MONGO_HOST
    }
  }
}

var mongodb_connection = "";
if (config.mongodb) {
  mongodb_connection = config.mongodb;
}

var mongoose = require('mongoose');
// mongoose.connect(MONGODB_URL, { promiseLibrary: require('bluebird'), useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(mongodb_connection, { promiseLibrary: require('bluebird'), useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('                   DB connection successful');
    console.log('********************************************************************');
  })
  .catch((err) => logger.error('DB connection failed', err));

var routeAPI = require('./routes/api/api');
var routeAPIUsers = require('./routes/api/users');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '50mb',
  extended: true
}));

app.use(cors());
var allowCrossDomain = function (req, res, next) {
  if ('OPTIONS' == req.method) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);

app.use('/', routeAPI);
app.use('/api', routeAPI);
routeAPI.use('/users', routeAPIUsers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;