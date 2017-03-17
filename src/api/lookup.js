/* @flow */
'use strict';

const appDictionary = {
    'tv': 'com.webos.app.livetv',
    'amazon': 'lovefilm.de',
    'netflix': 'netflix',
    'google': 'googleplaymovieswebos',
    'youtube': 'youtube.leanback.v4',

    // inputs
    'hdmi1': 'com.webos.app.hdmi1',
    'hdmi2': 'com.webos.app.hdmi2',
    'hdmi3': 'com.webos.app.hdmi3',

    // custom stuff
    'entertain': 'com.webos.app.hdmi1',
    'appletv': 'com.webos.app.hdmi2',
    'playstation': 'com.webos.app.hdmi3',
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
