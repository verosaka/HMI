/**
 * Configuration File for the HMI
 * 
 * endPointURL for OPC UA Server
 * other stuff
 * 
 * @author Thomas Frei
 * @date 2014-10-10
 */

// will be overwritten by mongodb
exports.TaskId = Math.floor((Math.random() * 1000) + 1);

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
});

// Default Commandline
if(!server){
  server = 'local';
}
console.log('Using Server Setup'.bgGreen, server);

if(!port){
  port = 80;
}
exports.Port = port;

exports.OutputPositionOutput = 1300;
exports.InputPositionOutput = 200;

//////////////////////////////////////////////////////////////////////////////
// Preconfigured Server
/*
 * OPCUA Server Configuration for Briefcase Setup
 */
if (server == 'briefcase'){
  exports.OPCUARecipe             = 'opc.tcp://192.168.42.42:4840/';
  exports.OPCUAOrder              = 'opc.tcp://192.168.42.42:4840/';
  exports.OPCUAMessageFeed        = 'opc.tcp://192.168.42.42:4840/';
  exports.OPCUATask               = 'opc.tcp://192.168.42.42:4840/';
  exports.OPCUAHandModule         = 'opc.tcp://192.168.42.42:4840/';
  exports.OPCUAMaintenanceModule  = 'opc.tcp://192.168.42.42:4840/';
  exports.OPCUAInputModule        = 'opc.tcp://192.168.42.51:4840/'; // ModuleX
  exports.OPCUAOutputModule       = 'opc.tcp://192.168.42.51:4840/';
  exports.FTPCamera               = '192.168.192.128'; // BR Panel

  exports.MQTTHost                = 'mqtt://mi5.itq.de';
  exports.DatabaseHost            = 'mongodb://localhost/mi5';

  exports.OPCUAXTS                = 'opc.tcp://192.168.42.10:4840';
}

/*
 * OPCUA Test Server-Configuration local
 */
if (server == 'local'){
  exports.OPCUARecipe             = 'opc.tcp://localhost:4334/';
  exports.OPCUAOrder              = 'opc.tcp://localhost:4334/';
  exports.OPCUAMessageFeed        = 'opc.tcp://localhost:4334/';
  exports.OPCUATask               = 'opc.tcp://localhost:4334/';
  exports.OPCUAHandModule         = 'opc.tcp://localhost:4334/';
  exports.OPCUAMaintenanceModule  = 'opc.tcp://localhost:4334/';
  exports.OPCUAInputModule        = 'opc.tcp://localhost:4334/'; // ModuleX
  exports.OPCUAOutputModule       = 'opc.tcp://localhost:4334/';
  exports.FTPCamera               = 'localhost'; // BR Panel

  exports.MQTTHost                = 'mqtt://mi5.itq.de';
  exports.DatabaseHost            = 'mongodb://localhost/mi5';
}


exports.MAINTENANCEMODULEID = 2402;

