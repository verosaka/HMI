/**
 * Configuration File for the HMI
 * 
 * endPointURL for OPC UA Server
 * other stuff
 * 
 * @author Thomas Frei
 * @date 2014-10-10
 */

// task Id beginning point (random number between 1 and 10000
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
  server = 'briefcase';
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
  exports.OPCUARecipe             = 'opc.tcp://192.168.1.42:4840/';
  exports.OPCUAOrder              = 'opc.tcp://192.168.1.42:4840/';
  exports.OPCUAMessageFeed        = 'opc.tcp://192.168.1.42:4840/';
  exports.OPCUATask               = 'opc.tcp://192.168.1.42:4840/';
  exports.OPCUAHandModule         = 'opc.tcp://192.168.1.42:4840/';
  exports.OPCUAMaintenanceModule  = 'opc.tcp://192.168.1.42:4840/';
  exports.OPCUAInputModule        = 'opc.tcp://192.168.1.51:4840/'; // ModuleX
  exports.OPCUAOutputModule       = 'opc.tcp://192.168.1.51:4840/';
  exports.FTPCamera               = '192.168.192.128'; // BR Panel
}


exports.MAINTENANCEMODULEID = 2402;

