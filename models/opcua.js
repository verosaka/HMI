
/**
 * OPC UA Model
 * 
 * Scope issue:
 * JS only sees direct function calls in the class opcuaPro as a method of this class.
 * Whenever a function is passed as a callback to a method, the scope of the passed function is moved to the method.
 * In the method, the function cannot longer see the "this." scope. 
 * Therefore, a 'global' object (in this case var opcua) is needed.
 * The opcua-object is mostly used in callback methods (cbMethodName), but can be necessary in other functions as well.
 * 
 * @author Thomas Frei
 * @date 2014-10-16
 */

var nodeopcua = require("node-opcua");
var util = require("util");
var events = require("events");

/*
 * Function to check the scope
 */
function isNested (thisobject) {
  if ( thisobject.opcuaObject == 1) {
    console.log('OK - .this is the opcuaPro object');
    return false;
  } else {
    console.log('SCOPE! - .this is in a nested scope: use the global opcua object');
    return true;
  }
}

/*
 * OpcUA object to handle scope-issues of nested cb calls
 */
var opcua;

// Define opcuaPro(totype) function as a class (using util.js)
opcuaPro = (function() {
  // ctor
  function opcuaPro() {
    this.opcuaObject = 1;
    this.client = undefined;
    this.sessoin = undefined;
    this.subscription = undefined;
    
    // Register all the inner Class-Event-Listeners. This needs to be done in the ctor.
    this.innerReactions();
  }

  opcuaPro.prototype = {
    constructor: opcuaPro,
    
    initialize: function() {
      console.log('initialize()');
      this.client = new nodeopcua.OPCUAClient();
      this.connect();
    },
    
    connect: function() {
      console.log('connect()');
      //isNested(this);
      //console.log( this );
      this.client.connect(CONFIG.endpointUrl, this.cbConnected);
    },
    cbConnected: function(err){
      if(!err){
        console.log('cbConnected()');
        //isNested(this);
        opcua.emit('connected');
        opcua.createSession(); // the cb is called in this.client.connect() and in this scope, the this.-object does not see the opcuaPro methods. Therefore a global opcua object is needed.        
      } else {
        opcua.errorHandling(err, 'Could not connect to the OPC UA Server - terminate');
        opcua.disconnect(err);
      }
    },
    
    createSession: function() {
      console.log('createSession()');
      this.client.createSession( function(err,session) {
        if(!err) {
          opcua.session = session;
        } else {
          opcua.errorHandling(err, 'Could not create Session');
        }
        opcua.emit('ready', opcua);
      });     
    },
    
    disconnect: function() {
      if ( isNested(this) ){
        opcua.client.disconnect(function(){ console.log('OK - disconnect()'); });
        opcua.emit('disconnected');
      } else {
        this.client.disconnect(function(){ console.log('OK - disconnect()'); });
        this.emit('disconnected');
      }
    },
    
    browse: function(folder) {
      // example: folder = 'RootFolder'
      this.session.browse(folder, this.cbBrowse );
    },
    cbBrowse: function (err, browse_result){
      if(!err) {
        browse_result[0].references.forEach(function(reference) {
          console.log( reference.browseName);
        });
      }
    },
    
    /**
     * Reads one value from the Opc UA Server.
     * Calls cbRead when read-request is finished
     * @param nodeIdToRead e.g. 'ns=4;b=1020FFAA' / 'ns=4;s=free_memory'
     */
    read: function(nodeIdToRead) {
      var max_age = 0;
      var nodes = [ { nodeId: '' + nodeIdToRead, attributeId: 13} ];
      this.session.read(nodes, max_age, this.cbRead);
    },
    cbRead: function(err, nodes, data) {
      if(err){
        console.log("ERR - read: " + err);
        console.log("statusCode: " + statusCode);
      } else {
        var emitData = {
            nodeId: 'ns=' + nodes[0].nodeId.namespace + ';s=' + nodes[0].nodeId.value,
            value: data[0].value.value,
            err: err
            };
        
        opcua.emit('readFinished', emitData);
        //        console.log(nodes);
        //        console.log(data)
      }
    },
    
    readWithSocket: function(nodeIdToRead, fieldId) {
      var max_age = 0;
      var nodes = [ { nodeId: '' + nodeIdToRead, attributeId: 13} ];
      this.session.read(nodes, max_age, this.cbReadWithSocket);
    },
    cbReadWithSocket: function(err, nodes, data) {
      if(err){
        console.log("ERR - read: " + err);
        console.log("statusCode: " + statusCode);
      } else {
        opcua.emit('readFinished', data);
        //console.log('Node Read' + data[0]);
      }
    },
    
    write: function(nodeIdToWrite, Value) {
      var opcVariant = new nodeopcua.Variant({
        dataType: nodeopcua.DataType.Double,
        value: Value });
      
      this.session.writeSingleNode(nodeIdToWrite, opcVariant, this.cbWrite);
    },
    cbWrite: function(err, statusCode){
      if(err){
        console.log("ERR - write: " + err);
        console.log("statusCode: " + statusCode);
      } else {
        opcua.emit('writeFinished'); //hint: opcua global object for scope-issue (see head)
      }
    },
    
    subscribe: function(){
      var subscriptionSettings = {
          requestedPublishingInterval: 1000,
          requestedLifetimeCount: 100, // 10
          requestedMaxKeepAliveCount: 10, // 2
          maxNotificationsPerPublish: 10,
          publishingEnabled: true,
          priority: 10 
          };
      this.subscription = new nodeopcua.ClientSubscription(this.session, subscriptionSettings);
      
      this.subscription.on("started",function(){
        console.log("SBUS: subscription started - subscriptionId=", opcua.subscription.subscriptionId);
        });
      this.subscription.on("keepalive",function(){
        console.log('SUBS: keepalive');
        })
        .on("terminated",function(){
        console.log('SUBS: terminated');
        });
    },
    
    monitor: function(nodeIdToMonitor){
      var itemToMonitor = {
          nodeId : nodeopcua.resolveNodeId(nodeIdToMonitor),
          attributeId: 13
      };
      var requestedParameters = {
          samplingInterval: 100,
          discardOldest: true,
          queueSize: 10
      };
      var timestampToReturn = nodeopcua.read_service.TimestampsToReturn.Both;
      
      var monitoredNode = this.subscription.monitor(itemToMonitor, requestedParameters, timestampToReturn);
      
      monitoredNode.on('changed', this.cbMonitor);
    },
    cbMonitor: function(dataValue){
      opcua.emit('monitoredItemChanged', dataValue);
    },
    
    
    innerReactions: function(){
      this.on('connected', function(){ console.log('OK - connected to ' + CONFIG.endpointUrl); });
      this.on('ready', function(){ console.log('OK - session established'); });
    },
    errorHandling: function(err, errmsg, sucmsg) {
      // Generate default variable values
      errmsg = typeof errmsg !== 'undefined' ? errmsg : '';
      sucmsg = typeof sucmsg !== 'undefined' ? sucmsg : '';
      
      if(err) {
        console.log('ERR - ' + errmsg);
        console.log(err);
//        this.client.disconnect(function(){ console.log('disconnect() after ERR'); });
//        this.disconnect();
        return false;
      } else {
        console.log('OK - ' + sucmsg);
        return true;
      }
    }
  };
  
  return opcuaPro;
}());

/*
 * Inherit the EventEmitter methods like .emit(), .on(), ...s
 */
opcuaPro.prototype.__proto__ = events.EventEmitter.prototype; // __proto__ is deprecated, but shouldn't be a problem.
 
/*
 * Check head of this file - needed for scope issues
 */
opcua = new opcuaPro();

module.exports = opcua;



