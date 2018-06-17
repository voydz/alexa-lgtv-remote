/* @flow */
'use strict';

require('dotenv').config();
const port = process.env.PORT || '3000';
const callHome = process.env.CALLHOME || 'http://google-public-dns-a.google.com/';
const debug=process.env.LGDEBUG;

import alexaApp from './src/app';
import express from 'express';
var app = express();

var http = require('http');

setInterval(function() {
    try {
        http.get(callHome, (resp) => {
            resp.on('error', (err) => {
                if (debug) {console.log('Error while calling home: ' + err.message);}
            });
        });	
    } catch (e) {
        if (debug) {console.log('Error in SetInterval: ' + e);}
    }
    
}, 900000); // every 15 minutes (900000) ping server to keep alive

// setup the alexa app and attach it to express before anything else

alexaApp.express({
    expressApp: app,
});

app.pre = function(req, res, type) {
    if (type === 'SessionEndedRequest') {
        res.send('').shouldEndSession(true);
        return true;
    }
};

app.get('/', (req,res) => { 
    res.send('Welcome to lgtv-remote server. You\'re running on port: ' + port + '</br> use /lgtv-remote endpoint to place calls' );    
}); 

app.listen(port, () => {
    console.log('alexa-lgtv-remote listening on port ' + port + '!');
});
