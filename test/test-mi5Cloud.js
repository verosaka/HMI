/**
 * Created by Thomas on 02.06.2015.
 */
/********************************* Testing Framework **************************************/
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

/********************************* App Mockup   ***************************************/
// Configuration
GLOBAL.CONFIG = require('./../config.js');
// Logger
GLOBAL.mi5Logger = require('./../models/mi5Logger').logger;
mi5Logger.start();

/********************************* Test *****************************************/
describe.skip('MQTT - Tests', function() {
    // Do a second connection to check and subscribe (manually) for testing
    var mqtt = require('mqtt');
    var client = mqtt.connect(CONFIG.MQTTHost);

    var mi5Cloud = require('./../models/mi5Cloud.js').mi5cloud;

    var testTopic = '/test/test/test/foo';
    var testMessage = 'TestMessage1234';
    var testTopic2 = '/test/test/test/foo/foo2/asdf';
    var testMessage2 = 'TestMessage1234lokolkk';

    it('should publish a message to a topic', function (done) {
        client.subscribe(testTopic);
        client.on('message', function(topic, message){
            if(testTopic == topic){
               if(testMessage == message){
                   done();
               }
            }
            client.end();
        });
        mi5Cloud.publish(testTopic, testMessage);
    });

    it('should listen to a topic', function(done){
        mi5Cloud.listen(testTopic).then(function(message){
            if(testMessage == message){ // TODO see what difference it makes when message comes as BUFFER
                done();
            }
        });

        mi5Cloud.publish(testTopic, testMessage);
    });

    it('should listen to a second topic', function(done){
        mi5Cloud.listen(testTopic2).then(function(message){
            if(testMessage2 == message){
                done();
            }
        });

        mi5Cloud.publish(testTopic2, testMessage2);
    });
});