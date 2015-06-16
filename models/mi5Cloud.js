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
 * Subscribe to a topic
 *
 * TODO: handle the events, give maybe a preselected client.on(topic,message) back
 *
 * @param topic
 */
mi5cloud.prototype.subscribe = function(topic) {
  var self = this;
  self.client.subscribe(topic);
};

/**
 * Listen to a topic
 *
 * Combination of making a subscription and then listening on the event, specific for one topic
 */
mi5cloud.prototype.listen = function(topic) {
  var self = this;
  var deferred = Q.defer();

  self.client.on()
}

/**
 * Publish a message
 *
 * @param topic
 * @param message
 */
mi5cloud.prototype.publish = function(topic, message){
  var self = this;
  self.client.publish(topic, message);
}
