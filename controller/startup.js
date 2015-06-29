/**
 * Startup-Controller
 *
 * @author Thomas Frei
 * @date 2015-06-29
 */
var Q = require('q');

/**
 * Show Feedback GUI for the last cocktail
 *
 * @param req
 * @param res
 */
function index(req, res) {
  var jadeData = {};

  res.render('sbadmin2/startup', jadeData);
  res.end();

}
exports.index = index;

/**
 * Send the feedback
 *
 * @param req
 * @param res
 */
function send(req, res){
  var jadeData = {};

  var taskId = parseInt(req.params.taskId, 10);
}
exports.send = send;

function consoleLogQ(mix){
  var deferred = Q.defer();
  deferred.resolve(mix);
  console.log('PromiseChain:',mix);
  return deferred.promise;
}