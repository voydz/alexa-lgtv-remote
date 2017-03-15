#!/usr/bin/env node

var alexaApp = require('../src/app');

var Docgen = require("../src/docgen");
new Docgen(alexaApp).generate()
