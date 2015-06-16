/**
 * TEST serviceInterface
 * 
 * @author Thomas Frei
 * @date 2015-03-17
 */
var assert = require('assert');
var should = require('should');
//var lucidJS = require('lucidjs');
//var event = new lucidJS.EventEmitter();
var async = require('async');
var _ = require('underscore');

// Start the OPC UA test Server
//
//describe('OPCUAServer ', function() {
//  describe('do not start the default OPC UA Server', function() {
//    //require('./OPCUAServer/OPCUAServer_InputModule');
//    it('does not give any errors');
//  });
//});

var ip = 'localhost';
var moduleId = 1101;
var service = new ServiceConnection(ip, moduleId);
function ServiceConnection(ip, moduleId){
  this._ip = ip;
  this._moduleId = moduleId;
  this._opc;
}

ServiceConnection.prototype.initialize = function(callback){
  var self = service;
  var endpointUrl = 'opc.tcp://'+service._ip+':4840/';
  self._opc = require('./../../models/simpleOpcua').server(endpointUrl);
  self._opc.initialize(function(err) {
    //console.log(endpointUrl, 'initialized');
    callback(err);
  });
}

ServiceConnection.prototype.disconnect = function(callback){
  var self = service;
  self._opc.disconnect();
  callback(null);
}

ServiceConnection.prototype.getNumberOfServiceSkills = function(callback){
  var self = service;
  var baseNodeArr = ['MI5.Module' + self._moduleId +'.ServiceSkillCount'];

  self._opc.mi5ReadArray(baseNodeArr, function(err, data) {
    callback(err, data);
  }); // end opc.mi5ReadArray
}

ServiceConnection.prototype.getServiceSkills = function(data, callback){
  var self = service;
  
  console.log('Number of service skills found:', data[0].value);
  var numberOfServiceSkills = data[0].value;
  
  var result;
  
  forEachArrayOPCUACounter(numberOfServiceSkills).forEach(function(item, arr){
    self._opc.mi5ReadArray(self.ServiceSkillNodeArray(item), function(err,data){
      console.log(err,data);
      
      // Final callback
      if(item == (numberOfServiceSkills-1)){
        callback(null);
      }
    });
  });
}

ServiceConnection.prototype.ServiceSkillNodeArray = function(serviceSkillNumber){
  assert(typeof serviceSkillNumber == 'number');
  var self = service;
  
  var base = 'MI5.Module' + self._moduleId + '.ServiceSkill.ServiceSkill' + serviceSkillNumber + '.';
  
  var serviceSkillArray = ['Abort', 'Busy', 'Done', 'Error', 'Execute', 'ID', 'Name', 'Requested', 'ParameterCount'];
  
  serviceSkillArray = _.map(serviceSkillArray, function(item){
    return base + item;
  });
    
  return serviceSkillArray; 
}

/**
 * Creates an array [startpoint,1,2,3,4,..., endpoint]
 * 
 * @param startpoint
 * @param endpoint
 * @returns {Array}
 */
function forEachArray(startpoint, endpoint) {
  var output = [];
  for (var i = startpoint; i <= endpoint; i++) {
    output.push(i);

    if (i == endpoint) {
      return output;
    }
  }
}

/**
 * Creates a more OPC UA speficif forEach ready array
 * NumberOfParameters = 2, array in OPC UA: 0,1
 * 
 * @param numberOfParameters
 * @returns {Array}
 */
function forEachArrayOPCUACounter(numberOfParameters) {
  return forEachArray(0, numberOfParameters-1);
}

///////////////////////////////////////////////////////////
// Manual testing:
async.waterfall([service.initialize
              , service.getNumberOfServiceSkills
              , service.getServiceSkills],
 function(err, results){
   console.log('err',err);
   console.log('results',results);
   service.disconnect(function(){});
});

////////////////////////////////////////////////////////////
////Do the Tests
//describe('ServiceConnection', function(){
//  
//  var ip = 'localhost'
//  var moduleId = 1101;
//  
//  var service = new ServiceConnection(ip, moduleId);
//  it('Create an instance', function(){
//   assert(service instanceof ServiceConnection);
//  });
//  it('Initialize the connection', function(){
//    service.initialize(function(err){
//      console.log('inited');
//      assert((err === null));
//    });
//  });
//  it('Get Number of ServiceSkills', function(){
//    var result;
//    service.getNumberOfServiceSkills(result);
//    console.log(result);
//    assert(true);
//  });
//  it('Disconnect', function(){
////    service.disconnect();
//  })
//});