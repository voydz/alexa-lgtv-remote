#!/usr/bin/env node
/* @flow */
'use strict';

import alexaApp from '../src/app';
import Docgen from '../src/docgen';

new Docgen(alexaApp).generate();
