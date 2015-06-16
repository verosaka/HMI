var mqtt = require('mqtt');
var Q = require('q');

/**
 * Initialize class and connect to MQTT
 * @returns {*}
 */
mi5cloud = function() {
  mi5Logger.info('Mi5 - Cloud loaded');

  this.client = mqtt.connect(CONFIG.MQTTHost);
  mi5Logger.info('MQTT connected');
};
exports.mi5cloud = new mi5cloud();

/**
 * Listen to a topic
 *
 * Combination of making a subscription and then listening on the event, specific for one topic
 */
mi5cloud.prototype.listen = function(topic) {
  var self = this;
  var deferred = Q.defer();

  self.client.subscribe(topic);

  self.client.on('message', function(topic, message){
    if(self.topic == this.topic){
      deferred.resolve(message);
    }
  });

  return deferred.promise;
};

/**
 * Publish a message
 *
 * @param topic
 * @param message
 */
mi5cloud.prototype.publish = function(topic, message){
  var self = this;

  self.client.publish(topic, message);
};
