/* @flow */
'use strict';

import Connector from './connector';

class Remote {
    connector: Connector;

    constructor(connector: Connector) {
        this.connector = connector;
    }

    turnOff(callback: ?Function): void {
        this.request('ssap://system/turnOff', (err, res, tv) => {
            if (callback) callback(err, res);

            // Auto disconnect.
            tv.disconnect();
        });
    }

    request(command: string, callback: ?Function): void {
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
