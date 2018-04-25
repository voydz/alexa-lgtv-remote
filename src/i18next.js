const language = process.env.LANGUAGE || 'en';
var i18next = require('i18next');
const Backend = require('i18next-sync-fs-backend');

i18next
    .use(Backend)
    .init({
        lng:language,
        debug:false,
        ns: ['translation'],
        defaultNs: 'translation',
        initImmediate: false,
        backend: {
            loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
            addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
        },
        fallbackLng: 'en',
        saveMissing: true
    }, (err) => {
        if (err) return console.log('something went wrong loading translations: ', err);
        console.log('Loaded "'+ i18next.language + '" Translations successfully. ');  
    });

module.exports = exports.default =  i18next;