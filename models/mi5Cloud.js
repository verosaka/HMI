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
 * Listen to a topic using a cb function
 *
 * @param topic
 * @param cb(message)
 */
mi5cloud.prototype.listen = function(topic, cb) {
  var self = this;
  self.client.subscribe(topic);

  self.client.on('message', function(topic, message){
    if(self.topic == this.topic){ //this is the topic from the cb event function
      message = JSON.parse(message); //message is buffer when coming from mqtt
      cb(message);
    }
  });
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
