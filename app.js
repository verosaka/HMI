/**
 * Configuration
 */
GLOBAL.CONFIG = require('./config.js'); 

// Server Modules
var path = require('path');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

//Lucid JS for uber-simple event handling
var lucidJS = require('lucidjs');
GLOBAL.lucid = new lucidJS.EventEmitter();

//Socket
GLOBAL.IO = require('socket.io').listen(server); 

// Helper
GLOBAL._ = require('underscore');
GLOBAL.md5 = require('MD5');
GLOBAL.moment = require('moment');

//********************************* Mi5 HMI
// Models
GLOBAL.mMaintenanceModule = require('./models/simpleMaintenanceModule');
GLOBAL.mManualModule = require('./models/simpleManualModule');
GLOBAL.mMessageFeed = require('./models/simpleMessageFeed');

// Background Services
var services = require('./controller/backgroundServices'); 

// Basic controller
var router = require('./controller/router'); // Control

// Express Environments
app.set('port', process.env.PORT || CONFIG.Port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
// Handling post requests:
app.use(express.urlencoded());
app.use(express.json());

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Execute Router
app = router.router(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});