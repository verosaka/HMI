var mqtt = require('mqtt');

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
 * Publish a message
 *
 * @param topic
 * @param message
 */
mi5cloud.prototype.publish = function(topic, message){
  var self = this;
  self.client.publish(topic, message);
}
