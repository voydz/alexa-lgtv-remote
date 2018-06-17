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
            if (this.config.debug) {console.log('trying to wake now, config %o:', this.config);}
            wol.wake(this.config.mac, {address:this.config.ip, port:this.config.port, num_packets:10}, (err) => {
                if (err) {
                    console.log('Rejected WOL: ' + err);
                    reject(err);
                }
                else fulfill();
            });
        });
    }

    connect(): Promise {
        // Connect to the device.
        this.tv = lgtv(this.config);
        if (this.config.debug) {console.log('Config Connect_promise: \n\t%o', this.config);}
        return new Promise((fulfill, reject) => {
            this.tv.on('error', (err) => {
                // Connection lost watcher.
                this.connected = false;
                console.log('Error Connecting: ' + err);
                reject(err);
            });

            this.tv.on('connect', () => {
                // Set connection state.
                this.connected = true;
                console.log('Config in on_connect.Promise: %o', this.config);
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

                //check if closed normally and fulfill request
                if (err && err!=1000) reject(err);
                else fulfill();
            });
        });
    }
}

export default Connector;
