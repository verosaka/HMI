/**
 * Class for creating an OPC UA Server with node-opcua
 */

// Load node-modules
opcua = require("node-opcua");

function OPCUAServer(port, moduleId) {
  this._port = port;
  this._moduleId = moduleId;    
  
  this._serverVars = [];
  this._localVars = [];
  this._server;
}
module.exports = OPCUAServer;

/**
 * Add folder
 */
OPCUAServer.prototype.createFolder = function(parentFolder, currentFolder){
  this._server.engine.createFolder(parentFolder,{ browseName: currentFolder});
}

/**
 * Set the Port for the OPCUA Server
 */
OPCUAServer.prototype.createServer = function(){
  var self = this;
  
  this._server = new opcua.OPCUAServer({
    port: self._port
  });

  this._server.buildInfo.productName = "InputModule";
  this._server.buildInfo.buildNumber = "7658";
  this._server.buildInfo.buildDate = new Date(2014,5,2);
  
  console.log("initialized");
};

OPCUAServer.prototype.initializeServer = function(){
  this._server.initialize(this.postInitialize);
}

OPCUAServer.prototype.postInitialize = function(){
  var self = this; // required for the nested callback function
  
  // Construct adress space!
  //construct_my_address_space(server);
  
  self._server.start(function() {
    console.log("Server is now listening ... ( press CTRL+C to stop)");
    console.log("port ", self._server.endpoints[0].port);
    
    var endpointUrl = self._server.endpoints[0].endpointDescription().endpointUrl;
    console.log(" the primary server endpoint url is ", endpointUrl );
  });
};

