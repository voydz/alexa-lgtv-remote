/* @flow */
'use strict';

// dotenv settings get lost here
// dunno why, mega strange
// reconfigure works tho
require('dotenv').config();

import Manager from './api/manager';

const manager = new Manager({
    url: process.env.TV_SOCKET,
    mac: process.env.TV_MAC,
});

/**
 * System and power
 */
export function TurnDeviceOn(request: Object, response: Object) {

    if (manager.isConnected())
        return response.say('The device is already switched on.');

    return manager.remote.turnOn()
        .then(() => {
            return response.say('OK.');
        }, (err) => {
            console.log(err);
            return response.say('There is a problem with the device.');
        });
}

export function TurnDeviceOff(request: Object, response: Object) {
    // TODO ad-hoc connect in manager?

    if (!manager.isConnected())
        return response.say('The device is already switched off.');

    return manager.remote.turnOff()
        .then(() => {
            return response.say('OK.');
        }, (err) => {
            console.log(err);
            return response.say('There is a problem with the device.');
        });
}

/**
 * Audio and Volume
 */
const deviceAudioMute = (request: Object, response: Object, state: boolean) => {
    // TODO ad-hoc connect in manager?

    if (!manager.isConnected())
        return response.say('The device is switched off.');

    return manager.remote.audioMute(state)
        .then(() => {
            return response.say('OK.');
        }, (err) => {
            console.log(err);
            return response.say('There is a problem with the device.');
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
        return response.say('The device is switched off.');

    return manager.remote.startApp(appId)
        .then(() => {
            return response.say('OK.');
        }, (err) => {
            console.log(err);
            return response.say('There is a problem with the device.');
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
        return response.say('The device is switched off.');

    return manager.remote.mediaPlay()
        .then(() => {
            return response.say('OK.');
        }, (err) => {
            console.log(err);
            return response.say('There is a problem with the device.');
        });
}

export function ControlDeviceMediaPause(request: Object, response: Object) {
    // TODO ad-hoc connect in manager?

    if (!manager.isConnected())
        return response.say('The device is switched off.');

    return manager.remote.mediaPause()
        .then(() => {
            return response.say('OK.');
        }, (err) => {
            console.log(err);
            return response.say('There is a problem with the device.');
        });
}

export function ControlDeviceMediaStop(request: Object, response: Object) {
    // TODO ad-hoc connect in manager?

    if (!manager.isConnected())
        return response.say('The device is switched off.');

    return manager.remote.mediaStop()
        .then(() => {
            return response.say('OK.');
        }, (err) => {
            console.log(err);
            return response.say('There is a problem with the device.');
        });
}
