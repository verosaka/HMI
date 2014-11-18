/**
 * Input Module Controller
 */

function index(req, res) {
  var jadeData = new Object;

  var interface = require('./../models/simpleModuleInterface');

  async.series([ function(callback) {
    interface.setEndpointUrl(CONFIG.OPCUAOutputModule);
    interface.setModuleId(CONFIG.OPCUAOutputModuleId);
    callback();
  }, function(callback) {
    interface.getInput(function(err, mi5object) {
      if (err) {
        console.log('ERR - Error in getInput', err);
        return 0;
      }
      console.log(mi5object);
      jadeData.input = mi5object;
      callback(err);
    })
  }, function(callback) {
    interface.getOutput(function(err, mi5object) {
      if (err) {
        console.log('ERR - Error at getOutput', err);
        return 0;
      }
      console.log(mi5object);
      jadeData.output = mi5object;
      callback(err);
    });
  }, function(callback) {
    console.log(JSON.stringify(jadeData, null, 1));
    res.render('sbadmin2/output_module_index', jadeData);
    res.end();
  } ]);

}
exports.index = index;