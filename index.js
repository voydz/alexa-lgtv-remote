require('dotenv').config();

var alexaApp = require("./src/app");
var express = require("express");
var app = express();

// setup the alexa app and attach it to express before anything else
alexaApp.express({
  expressApp: app,
});

app.listen(process.env.PORT, function () {
  console.log('alexa-lgtv-remote listening on port ' + process.env.PORT + '!');
});
