#!/usr/bin/env node
/* @flow */
'use strict'

var alexaApp = require('../src/app');

var Docgen = require("../src/docgen");
new Docgen(alexaApp).generate()
