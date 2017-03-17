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
        '{schalte|mache} {fernseher|tv|glotze} {an|ein}',
    ]
}, TurnDeviceOn);

app.intent('TurnDeviceOff', {
    'slots': {},
    'utterances': [
        '{schalte|mache} {fernseher|tv|glotze} aus',
    ]
}, TurnDeviceOff);

app.intent('SwitchDeviceMute', {
    'slots': {},
    'utterances': [
        'schalte {fernseher|tv} {lautlos|stumm}',
    ]
}, SwitchDeviceMute);

app.intent('SwitchDeviceUnmute', {
    'slots': {},
    'utterances': [
        'schalte {fernseher|tv} laut',
        'hebe {lautlos|stumm|stummschaltung} auf',
    ]
}, SwitchDeviceUnmute);

app.intent('LaunchDeviceApp', {
    'slots': {
        'app_id': 'APP_IDS'
    },
    'utterances': [
        '{starte|öffne} die {app|anwendung} {-|app_id}',
        '{starte|öffne} die {-|app_id} {app|anwendung}',
    ]
}, LaunchDeviceApp);

app.intent('SwitchDeviceInput', {
    'slots': {
        'input_id': 'INPUT_IDS'
    },
    'utterances': [
        'wechsle {eingang|input} {zu|nach} {-|input_id}',
        'wechsle {zu|zur|zum} {-|input_id}',
    ]
}, SwitchDeviceInput);

app.intent('ControlDeviceMediaPlay', {
    'slots': {},
    'utterances': [
        'starte wiedergabe',
        'setze wiedergabe fort',
    ]
}, ControlDeviceMediaPlay);

app.intent('ControlDeviceMediaPause', {
    'slots': {},
    'utterances': [
        'pausiere wiedergabe',
    ]
}, ControlDeviceMediaPause);

app.intent('ControlDeviceMediaStop', {
    'slots': {},
    'utterances': [
        'stoppe wiedergabe',
        'halte wiedergabe an',
    ]
}, ControlDeviceMediaStop);

export default app;
