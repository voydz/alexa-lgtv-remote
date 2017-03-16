/* @flow */
'use strict';

import Connector from './connector';

class Remote {
    connector: Connector;

    constructor(connector: Connector) {
        this.connector = connector;
    }

    audioMute(state: bool, callback: ?Function): void {
        this.request('ssap://audio/setMute', {mute: state}, (err, res, tv) => {
            if (callback) callback(err, res);
        })
    }

    mediaPlay(callback: ?Function): void {
        this.request('ssap://media.controls/play', (err, res, tv) => {
            if (callback) callback(err, res);
        });
    }

    mediaPause(callback: ?Function): void {
        this.request('ssap://media.controls/pause', (err, res, tv) => {
            if (callback) callback(err, res);
        });
    }

    startApp(appId: string, callback: ?Function): void {
        this.request('ssap://system.launcher/launch', {id: appId}, (err, res, tv) => {
            if (callback) callback(err, res);
        });
    }

    switchInput(callback: ?Function): void {
        this.request('ssap://tv/switchInput', (err, res, tv) => {
            if (callback) callback(err, res);
        });
    }

    turnOff(callback: ?Function): void {
        this.request('ssap://system/turnOff', (err, res, tv) => {
            if (callback) callback(err, res);

            // Auto disconnect.
            tv.disconnect();
        });
    }

    request(command: string, payload: any, callback: ?Function): void {
        // Check device connection.
        this.connectedOrFail();

        // Execute request on device.
        this.connector.tv.request(command, (err, res) => {
            // Custom callback.
            if (callback) callback(err, res, this.connector.tv);
        });
    }

    connectedOrFail(): void {
        if (!this.connector.connected)
            throw new Error('device not connected');
    }
}

export default Remote;
