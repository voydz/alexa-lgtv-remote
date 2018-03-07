/* @flow */
'use strict';

import Remote from './remote';
import Connector from './connector';

const internalConfig = {
    reconnect: false,
    timout: 3000,
};

class Manager {
    connector: Connector;
    remote: Remote;

    constructor(config: Object) {
        config = this.mergeConfig(config);

        this.connector = new Connector(config);
        this.remote = new Remote(this.connector);

        // Try to connect.
        this.connector.connect()
            .then(() => {
                this.connector.connected = true;
            }, (err) => {
                console.log(err);
                this.connector.connected = false;
            });
    }

    isConnected(): bool {
        return this.connector.connected;
    }

    mergeConfig(config: Object): Object {
        return Object.assign({}, config, internalConfig);
    }
}

export default Manager;
