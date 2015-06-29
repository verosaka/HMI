var Q = require('q');

/**
 * Initialize class and connect to MQTT
 * @returns {*}
 */
mi5startup = function() {
  mi5Logger.info('Mi5 - Startup loaded');
};
var instance = new mi5database();
exports.instance = instance;

/**
 * Example for a method returning a promise
 *
 * @returns {*|promise}
 */
mi5startup.prototype.createPromise = function() {
  var self = instance;
  var deferred = Q.defer();

  // Error
  if(err) deferred.reject(err);

  // Success
  deferred.resolve(true);

  return deferred.promise;
};

mi5startup.prototype.VirtualBoxStart(name){
  var self = instance;
  var deferred = Q.defer();

  // Start the virtual machine ---------------------
  if(err) deferred.reject(err);
  // Success
  deferred.resolve(true);

  return deferred.promise;
}

mi5startup.prototype.MongoDBStart(mongodbpath){
  var self = instance;
  var deferred = Q.defer();

  // Start MongoDB
  if(err) deferred.reject(err);
  // Success
  deferred.resolve(true);

  return deferred.promise;
}

mi5startup.prototype.ProcessToolStart(){
  var self = instance;
  var deferred = Q.defer();

  // Start MongoDB
  if(err) deferred.reject(err);
  // Success
  deferred.resolve(true);

  return deferred.promise;
}

mi5startup.prototype.ProcessToolConfigure(config){
  var self = instance;
  var deferred = Q.defer();

  // Check config vor plausability
  if(err) deferred.reject(err);

  // Write config file
  deferred.resolve(true);

  return deferred.promise;
}

mi5startup.prototype.TestRunStart(){
  var self = instance;
  var deferred = Q.defer();

  // If there is any error
  if(err) deferred.reject(err);

  // Success
  deferred.resolve(true);

  return deferred.promise;
}

mi5startup.prototype.TestRunAbort(){
  var self = instance;
  var deferred = Q.defer();

  // If there is any error
  if(err) deferred.reject(err);

  // Success
  deferred.resolve(true);

  return deferred.promise;
}

mi5startup.prototype.TestRunOrder(recipeid){

}

mi5startup.prototype.TestRunHandleInput(){

}

mi5startup.prototype.TestRunHandleOutput(){

}