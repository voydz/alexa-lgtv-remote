/* @flow */
'use strict';

// dotenv settings get lost here
// dunno why, mega strange
// reconfigure works tho
require('dotenv').config();

import Manager from './api/manager';
var i18next = require('./i18next');
var url = require('url');
const tv_socket = process.env.TV_SOCKET || 'ws://lgwebostv:3000';
const tv_mac=process.env.TV_MAC || '00:00:00:00:00';
const debug=process.env.LGDEBUG;

// Get websocket address + ip
const tv_URL = url.parse(tv_socket);

const manager = new Manager({
    url: tv_URL.href,
    mac: tv_mac,
    ip: tv_URL.host.substr(0,tv_URL.host.length-5),
    port: tv_URL.port,
    debug: debug
});


/**
 * System and power
 */
export function TurnDeviceOn(request: Object, response: Object) {

    if (manager.isConnected())
        return response.say(i18next.t('Connected'));

    // checked if connected, and now will attempt turnOn()
    if (debug) {console.log('Not yet connected, returning remote.turnon ');}

    return manager.remote.turnOn()
        .then(() => {
            if (debug) {console.log('turned on without error ');}
            return response.say(i18next.t('OK'));
        }, (err) => {
            if (debug) {console.log('problem after turning on: ' +err);}
            return response.say(i18next.t('DeviceProblem'));
        });
}

export function TurnDeviceOff(request: Object, response: Object) {
    // TODO ad-hoc connect in manager?

    if (!manager.isConnected())
        return response.say(i18next.t('Disconnected'));

    return manager.remote.turnOff()
        .then(() => {
            return response.say(i18next.t('OK'));
        }, (err) => {
            console.log(err);
            return response.say(i18next.t('DeviceProblem'));
        });
}

/**
 * Audio and Volume
 */
const deviceAudioMute = (request: Object, response: Object, state: boolean) => {
    // TODO ad-hoc connect in manager?

    if (!manager.isConnected())
        return response.say(i18next.t('DeviceOff'));

    return manager.remote.audioMute(state)
        .then(() => {
            return response.say(i18next.t('OK'));
        }, (err) => {
            console.log(err);
            return response.say(i18next.t('DeviceProblem'));
        });
};

export function SwitchDeviceMute(request: Object, response: Object) {
    return deviceAudioMute(request, response, true);
}

export function SwitchDeviceUnmute(request: Object, response: Object) {
    return deviceAudioMute(request, response, false);
}

/**
 * Apps and inputs
 */

const deviceLaunchApp = (request: Object, response: Object, appId: string) => {
    // TODO ad-hoc connect in manager?

    if (!manager.isConnected())
        return response.say(i18next.t('DeviceOff'));

    return manager.remote.startApp(appId)
        .then(() => {
            return response.say(i18next.t('OK'));
        }, (err) => {
            console.log(err);
            return response.say(i18next.t('DeviceProblem'));
        });
};

export function LaunchDeviceApp(request: Object, response: Object) {
    const app: string = request.slot('app_id');
    return deviceLaunchApp(request, response, app);
}

export function SwitchDeviceInput(request: Object, response: Object) {
    const app: string = request.slot('input_id');
    return deviceLaunchApp(request, response, app);
}

/**
 * Media control
 */

export function ControlDeviceMediaPlay(request: Object, response: Object) {
    // TODO ad-hoc connect in manager?

    if (!manager.isConnected())
        return response.say(i18next.t('DeviceOff'));

    return manager.remote.mediaPlay()
        .then(() => {
            return response.say(i18next.t('OK'));
        }, (err) => {
            console.log(err);
            return response.say(i18next.t('DeviceProblem'));
        });
}

export function ControlDeviceMediaPause(request: Object, response: Object) {
    // TODO ad-hoc connect in manager?

    if (!manager.isConnected())
        return response.say(i18next.t('DeviceOff'));

    return manager.remote.mediaPause()
        .then(() => {
            return response.say(i18next.t('OK'));
        }, (err) => {
            console.log(err);
            return response.say(i18next.t('DeviceProblem'));
        });
}

export function ControlDeviceMediaStop(request: Object, response: Object) {
    // TODO ad-hoc connect in manager?

    if (!manager.isConnected())
        return response.say(i18next.t('DeviceOff'));

    return manager.remote.mediaStop()
        .then(() => {
            return response.say(i18next.t('OK'));
        }, (err) => {
            console.log(err);
            return response.say(i18next.t('DeviceProblem'));
        });
}

export function AmazonHelp(request, response) {
    // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
    response.say(i18next.t('HelpOutput')).reprompt(i18next.t('RePrompt')).shouldEndSession(false);
}

export function AmazonStop(request, response) {
    response.say(i18next.t('StopOutput'));
}

export function AmazonCancel(request, response) {
    response.say(i18next.t('CancelOutput'));
}