/* @flow */
'use strict'

require('dotenv').config();
const port: string = process.env.PORT || '3000';

var alexaApp = require("./src/app");
var express = require("express");
var app = express();

// setup the alexa app and attach it to express before anything else
alexaApp.express({
  expressApp: app,
});

app.listen(port, () => {
  console.log('alexa-lgtv-remote listening on port ' + port + '!');
});
