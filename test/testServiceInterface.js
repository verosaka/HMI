/**
 * TEST serviceInterface
 * 
 * @author Thomas Frei
 * @date 2015-03-17
 */

var endpointUrl = 'opc.tcp://localhost:4840/';
var moduleId = 1101;

var opc = require('./../models/simpleOpcua').server(endpointUrl);
opc.initialize(function(err) {
  if (err) {
    console.log(err);
    callback(err);
    return 0;
  }
  var baseNodeArr = ['MI5.Module' + moduleId +'.ServiceSkillCount'];
  opc.mi5ReadArray(baseNodeArr, function(err, data) {
    console.log(err, data);

    opc.disconnect();
    // callback(err, mi5Object);

  }); // end opc.mi5ReadArray
}); // end opc.initialize()


setTimeout(function(){console.log('terminated')}, 2000);