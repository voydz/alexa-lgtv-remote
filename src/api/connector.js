/* @flow */
'use strict';

import lgtv from 'lgtv2';
import wol from 'wake_on_lan';
import Promise from 'promise';

class Connector {
    tv: Object;
    config: Object;
    connected: bool;

    constructor(config: Object) {
        this.config = config;

        // set default vals
        this.connected = false;
    }

    wake(): Promise {
        return new Promise((fulfill, reject) => {
            wol.wake(this.config.mac, (err) => {
                if (err) reject(err);
                else fulfill();
            });
        });
    }

    connect(): Promise {
        // Connect to the device.
        this.tv = lgtv(this.config);

        return new Promise((fulfill, reject) => {
            this.tv.on('error', (err) => {
                // Connection lost watcher.
                this.connected = false;
                reject(err);
            });

            this.tv.on('connect', () => {
                // Set connection state.
                this.connected = true;
                fulfill(this.tv);
            });
        });
    }

    disconnect(): Promise {
        // Disconnect from device.
        this.tv.disconnect();

        return new Promise((fulfill, reject) => {
            this.tv.on('close', (err) => {
                // Set connection state.
                this.connected = false;

                if (err) reject(err);
                else fulfill();
            });
        });
    }
}

export default Connector;
