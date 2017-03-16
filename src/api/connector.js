/* @flow */
'use strict';

import lgtv from 'lgtv2';
import wol from 'wake_on_lan';
import Remote from './remote';

class Connector {
    tv: Object;
    config: Object;
    connected: bool;

    constructor(config: ?Object) {
        this.config = config || {
            url: process.env.TV_SOCKET
        };

        this.connected = false;
    }

    wake(callback: ?Function): void {
        wol.wake(process.env.TV_MAC, callback);
    }

    connect(callback: ?Function): void {
        // Connect to the device.
        this.tv = lgtv(this.config);

        this.tv.on('connect', () => {
            // Set connection state.
            this.connected = true;

            // Call the callback with the remote.
            if (callback) callback(new Remote(this));
        });
    }

    disconnect(callback: ?Function): void {
        // Disconnect from device.
        this.tv.disconnect();

        this.tv.on('disconnect', () => {
            // Set connection state.
            this.connected = false;

            // Call the callback with the remote.
            if (callback) callback();
        });
    }
}

export default Connector;
