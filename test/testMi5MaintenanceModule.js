/**
 * TEST recipeInterface.js
 * 
 * @author Thomas Frei
 * @date 2014-11-03
 */
GLOBAL.CONFIG = require('./../config.js');

/**
 * Node-Module dependencies.
 * https://www.digitalocean.com/community/tutorials/how-to-install-express-a-node-js-framework-and-set-up-socket-io-on-a-vps
 */
var path = require('path'), express = require('express'), app = express(), http = require('http'), server = http
    .createServer(app);

//Lucid JS
var lucidJS = require('lucidjs');
var lucid = new lucidJS.EventEmitter();

GLOBAL.IO = require('socket.io').listen(server);
GLOBAL._ = require('underscore');
GLOBAL.md5 = require('MD5');
var async = require('async');

var maintenanceModule = new require('./../models/mi5MaintenanceModule').maintenanceModule;

async.series([function(callback){
  maintenanceModule.initialize(callback);
}, function(callback){
  maintenanceModule.getModuleData(callback);
}], function(err, results){
  console.log(maintenanceModule.jadeData);
});