/* @flow */
'use strict';

import {
    TurnDeviceOn,
    TurnDeviceOff,
    SwitchDeviceMute,
    SwitchDeviceUnmute,
    LaunchDeviceApp,
    SwitchDeviceInput,
    ControlDeviceMediaPlay,
    ControlDeviceMediaPause,
    ControlDeviceMediaStop
} from './dispatcher';

import alexa from 'alexa-app';
const app = new alexa.app('lgtv-remote');

app.intent('TurnDeviceOn', {
    'slots': {},
    'utterances': [
        'on',
        '{ |to} turn on { |tv}',
    ]
}, TurnDeviceOn);

app.intent('TurnDeviceOff', {
    'slots': {},
    'utterances': [
        'off',
        '{ |to} turn off { |tv}',
    ]
}, TurnDeviceOff);

app.intent('SwitchDeviceMute', {
    'slots': {},
    'utterances': [
        '{ |to} mute { |tv}',
        'turn on mute',
    ]
}, SwitchDeviceMute);

app.intent('SwitchDeviceUnmute', {
    'slots': {},
    'utterances': [
        '{ | to} {un mute|unmute} { |tv}',
        'turn off mute',
    ]
}, SwitchDeviceUnmute);

app.intent('LaunchDeviceApp', {
    'slots': {
        'app_id': 'APP_IDS'
    },
    'utterances': [
        ' to open {-|app_id}',
        '{start|open} the {app|application} {-|app_id}',
        '{start|open} the {-|app_id} {app|application}',
    ]
}, LaunchDeviceApp);

app.intent('SwitchDeviceInput', {
    'slots': {
        'input_id': 'INPUT_IDS'
    },
    'utterances': [
        'change input to {-|input_id}',
        'switch {to|to the} {-|input_id}',
    ]
}, SwitchDeviceInput);

app.intent('ControlDeviceMediaPlay', {
    'slots': {},
    'utterances': [
        '{start|resume} playback',
        'play { |show}',
        'resume',
    ]
}, ControlDeviceMediaPlay);

app.intent('ControlDeviceMediaPause', {
    'slots': {},
    'utterances': [
        'pause { | show | playback}',
    ]
}, ControlDeviceMediaPause);

app.intent('ControlDeviceMediaStop', {
    'slots': {},
    'utterances': [
        'stop show',
        'stop show',
    ]
}, ControlDeviceMediaStop);

export default app;
