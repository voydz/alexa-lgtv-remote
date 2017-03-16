/* @flow */
'use strict';

import Connector from './api/connector';
import Remote from './api/remote';

import Promise from 'promise';
import alexa from 'alexa-app';
var app = new alexa.app('lgtv-remote');

var connector = new Connector();
var remote: ?Remote = null;

connector.connect((res) => {
    remote = res;
});

app.intent('TurnDeviceOn', {
    'slots': {},
    'utterances': [
        '{schalte|mache} {fernseher|tv|glotze} {an|ein}',
    ]
},
function(request, response) {
    console.log('turn device on');
    var turnOn = new Promise(function(fulfill, reject) {
        connector.wake(function(err) {
            if (err) reject(err);
            else fulfill();
        });
    });

    return turnOn
    .then(function() {
        return response.say('OK.');
    }, function (err) {
        console.log(err);
        return response.say('Es ist ein problem mit dem gerät aufgetreten.');
    });
});

app.intent('TurnDeviceOff', {
    'slots': {},
    'utterances': [
        '{schalte|mache} {fernseher|tv|glotze} aus',
    ]
},
function(request, response) {
    console.log('turn device off');
    var turnOff = new Promise(function(fulfill, reject) {
        if (remote == null) return;
        remote.turnOff(function(err, res) {
            if (err) reject(err);
            else fulfill(res);
        });
    });

    return turnOff
    .then(function() {
        return response.say('OK.');
    }, function (err) {
        console.log(err);
        return response.say('Es ist ein problem mit dem gerät aufgetreten.');
    });
});

export default app;
