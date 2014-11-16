/*
 * Mocha Test Information
 * http://unitjs.com/guide/mocha.html
 */

/**
 * Configuration
 */
GLOBAL.CONFIG = require('./../config.js');

/**
 * Node-Module dependencies.
 * https://www.digitalocean.com/community/tutorials/how-to-install-express-a-node-js-framework-and-set-up-socket-io-on-a-vps
 */
var path = require('path'), express = require('express'), app = express(), http = require('http'), server = http
    .createServer(app), should = require('should'); // For Testing

GLOBAL.IO = require('socket.io').listen(server);
GLOBAL._ = require('underscore');
GLOBAL.md5 = require('MD5');

var interface = require('./../models/simpleModuleInterface');
var sMI = interface;
var opcH = require('./../models/simpleOpcuaHelperModuleInterface');

// // DummyObject
// var dummyObject = sMI.structInputObjectBlank();
// console.log(dummyObject);
//
// var structInput = sMI.structInput('MI5.Module2501');
// console.log(structInput);
//
// Check new splitNodeId
var split = opcH
    .splitNodeId('MI5.Module2501.SkillInput.SkillInput2.ParameterInput.ParameterInput4.Name');
console.log(split);
var split = opcH.splitNodeId('MI5.Module2501.SkillInput.SkillInput2.Execute');
console.log(split);

var isArray = opcH.detectIfArray('SkillInput');
console.log(isArray);

// Check mapping
sMI.getInputs([ 0, 1 ], function(err, mi5object) {
  console.log(JSON.stringify(mi5object, null, 1));
})

//
// describe('simpleModuleInterface', function() {
//
// var simpleModuleInterface = require('./../models/simpleModuleInterface');
// describe('structTaskObjectBlank()', function() {
//
// it('should give a dummy object, in which the opc ua data is inserted', function() {
//
// });
//
// });
//
// describe('subtractOne()', function() {
//
// it('should correctly subtract one from the given number', function() {
// // assertions here
// });
//
// });
//
// });
