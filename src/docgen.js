/* @flow */
'use strict';

import fs from 'fs';
import path from 'path';

class Docgen {
    alexaApp: Object;
    config: Object;

    constructor(alexaApp: Object, config: ?Object) {
        this.alexaApp = alexaApp;
        this.config = config || {
            'schema_path': 'speechAssets/intentSchema.json',
            'utterances_path': 'speechAssets/SampleUtterances.txt'
        };
    }

    generate(): void {
        this.saveSchema();
        this.saveUtterances();
    }

    saveSchema(): void {
        var schema = this.alexaApp.schema();
        this.writeFile(this.config.schema_path, schema);
    }

    saveUtterances(): void {
        var utterances = this.alexaApp.utterances();
        this.writeFile(this.config.utterances_path, utterances);
    }

    writeFile(file: string, contents: string): void {
        this.ensureDirExists(file);
        fs.writeFileSync(file, contents);

        console.log('Wrote '+ contents.length +' bytes to \'' + file + '\' sucessfully.');
    }

    ensureDirExists(file: string): void {
        const dir = path.dirname(file);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
}

export default Docgen;
