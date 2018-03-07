/* @flow */
'use strict';

import Promise from 'promise';
import Connector from './connector';
import Lookup from './lookup';

class Remote {
    connector: Connector;

    constructor(connector: Connector) {
        this.connector = connector;
    }

    audioMute(state: bool): Promise {
        return this.request('ssap://audio/setMute', {mute: state});
    }

    mediaPlay(): Promise {
        return this.request('ssap://media.controls/play');
    }

    mediaPause(): Promise {
        return this.request('ssap://media.controls/pause');
    }

    mediaStop(): Promise {
        return this.request('ssap://media.controls/stop');
    }

    startApp(app: string): Promise {
        const appId = Lookup.app(app);
        console.log('Starting: ' + appId);
        return this.request('ssap://system.launcher/launch', {id: appId});
    }

    closeApp(app: string): Promise {
        const appId = Lookup.app(app);
        return this.request('ssap://system.launcher/close', {id: appId});
    }

    getAppList(): Promise {
        // returns res.launchPoints with all necessary info
        return this.request('ssap://com.webos.applicationManager/listLaunchPoints');
    }

    switchInput(inputId: string): Promise {
        return this.request('ssap://tv/switchInput', {id: inputId});
    }

    turnOn(): Promise {
        // To turn device on we use wake on lan.
        return this.connector.wake()
            .then(() => {
                console.log('Executing turnOn');
                // Auto connect.
                return this.connector.connect();
            });
    }

    turnOff(): Promise {
        return this.request('ssap://system/turnOff')
            .then(() => {
                // Auto disconnect.
                console.log('Executing turnOff');

                return this.connector.disconnect();
            });
    }

    request(command: string, payload: any): Promise {
        // Check device connection.
        this.connectedOrFail();

        // Log requests.
        console.log('Fire of request \'' + command + '\' with payload:', payload);

        return new Promise((fulfill, reject) => {
            // Execute request on device.
            this.connector.tv.request(command, payload, (err, res) => {
                if (err) reject(err);
                else fulfill(this.connector.tv, res);
            });
        });
    }

    connectedOrFail(): void {
        if (!this.connector.connected)
            throw new Error('device not connected');
    }
}

export default Remote;
