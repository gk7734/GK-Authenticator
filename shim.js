// shim.js
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer;
global.process = require('process');
