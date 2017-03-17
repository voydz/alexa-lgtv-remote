/* @flow */
'use strict';

require('dotenv').config();
const port = process.env.PORT || '3000';

import alexaApp from './src/app';
import express from 'express';
var app = express();

// setup the alexa app and attach it to express before anything else
alexaApp.express({
    expressApp: app,
});

app.listen(port, () => {
    console.log('alexa-lgtv-remote listening on port ' + port + '!');
});
