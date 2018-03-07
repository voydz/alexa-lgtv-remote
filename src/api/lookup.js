/* @flow */
'use strict';

const appDictionary = {
    'tv': 'com.webos.app.livetv',
    'amazon': 'lovefilm.de',
    'netflix': 'netflix',
    'google': 'googleplaymovieswebos',
    'youtube': 'youtube.leanback.v4',
    'hulu': 'hulu',
    'sling': 'com.movenetworks.app.sling-tv-sling-production',

    // inputs
    'hdmi1': 'com.webos.app.hdmi1',
    'hdmi2': 'com.webos.app.hdmi2',
    'hdmi3': 'com.webos.app.hdmi3',
    'hdmi4': 'com.webos.app.hdmi4',

    // custom stuff
    'dvd': 'com.webos.app.hdmi1',
    'chromecast': 'com.webos.app.hdmi2',
    'playstation': 'com.webos.app.hdmi3',
    'ps4':'com.webos.app.hdmi4'
};

class Lookup {

    static app(app: string): string {
        // Some sanity operations first.
        app = app.toLowerCase();
        app = app.replace(/[^a-z]/gi, '');

        console.log('try to resolve app ' + app);

        if (!appDictionary.hasOwnProperty(app))
            throw new Error('app id not known');

        return appDictionary[app];
    }
}

export default Lookup;
