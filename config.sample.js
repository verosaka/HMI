/**
 * Configuration File for the HMI
 *
 * endPointURL for OPC UA Server
 * other stuff
 *
 * @author Thomas Frei
 * @date 2014-10-10
 */
var config = {};

// will be overwritten by mongodb
config.TaskId = Math.floor((Math.random() * 1000) + 1);

//////////////////////////////////////////////////////////////////////////////
// Commandline
var port = undefined;
var server = undefined;
process.argv.forEach(function(val) {
  if(val.slice(0,6)=='-port='){
    port = val.slice(6);
  }

  if(val.slice(0,8)=='-server='){
    server = val.slice(8);
  }

  if(val.slice(0,13)=='-startMongoDB'){
    setTimeout(function(){ //wait one execution tick for config to be complete
      // Start Mongo DB
      var exec = require('child_process').exec;
      console.log('starting mongoDB', config.MongoDBPath);
      exec(config.MongoDBPath, function(error, stdout, stderr){
        console.log('ChildProcess'.red, 'stdout:', stdout, 'stderr:', stderr);
        if (error !== null) {
          console.log('ChildProcess'.red, 'exec error: ' + error);
        }
      });
    },0);
  }

});

// Default Commandline
if(!server){
  server = 'local';
}
console.log('Using Server Setup'.bgGreen, server);

if(!port){
  port = 80;
}
config.Port = port;

//////////////////////////////////////////////////////////////////////////////
// Preconfigured Server
config.OutputPositionOutput = 1300;
config.InputPositionOutput = 200;
config.MAINTENANCEMODULEID = 2402;

/*
 * OPCUA Server Configuration for Briefcase Setup
 */

/*
 * OPCUA Test Server-Configuration local
 */
if (server == 'local'){
  config.OPCUARecipe             = 'opc.tcp://localhost:4334/';
  config.OPCUAOrder              = 'opc.tcp://localhost:4334/';
  config.OPCUAMessageFeed        = 'opc.tcp://localhost:4334/';
  config.OPCUATask               = 'opc.tcp://localhost:4334/';
  config.OPCUAHandModule         = 'opc.tcp://localhost:4334/';
  config.OPCUAMaintenanceModule  = 'opc.tcp://localhost:4334/';
  config.OPCUAInputModule        = 'opc.tcp://localhost:4334/'; // ModuleX
  config.OPCUAOutputModule       = 'opc.tcp://localhost:4334/';
  config.FTPCamera               = 'localhost'; // BR Panel

  config.MQTTHost                = 'mqtt://mi5.itq.de';
  config.DatabaseHost            = 'mongodb://localhost/mi5';
  config.MongoDBPath             = '';

  config.OPCUAXTS                = 'opc.tcp://localhost:4840';
}

exports.config = config;