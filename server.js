const express = require('express');
const fs = require('fs');
const passport = require('passport');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const auth = require('./config/middlewares/authorization');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Register models
require('./app/models/analytics');
require('./app/models/chat');
require('./app/models/tweets');
require('./app/models/user');

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// Setup application
require('./config/passport')(passport, config);
require('./config/express')(app, config, passport);
require('./config/routes')(app, passport, auth);

// Start application
app.listen(port);
console.log('Express app started on port ' + port);
