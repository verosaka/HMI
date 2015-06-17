/**
 * @description Cocktail-Feedback - Give and Receive feedback, show the result
 *
 * @author Thomas Frei
 * @date 2015-06-15
 */

/**
 * Show Feedback GUI for cocktail
 *
 * @param req
 * @param res
 */
function index(req, res) {
  var jadeData = undefined;

  res.render('sbadmin2/cocktail_feedback', jadeData);
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

  //mi5Cloud.publish('/mi5/showcase/cocktail/user/feedback', 'TestNachricht - HMI - sendFeedback - TaskId: ' + taskId);
  //mi5Logger.info('mi5MQTT - published feedback for taskId: ' + taskId);

  //mi5Database.saveOrder(taskId, 14051, [43,11,3]);
  //mi5Database.getOrder(1456).then(console.log);
  //mi5Database.getLastTaskId().done(console.log);
  //mi5Database.getLastOrder().done(console.log);
  //mi5Database.getLastTaskId().then(mi5Database.getOrder).done(console.log);
  //mi5Database.getLastOrder().done(console.log);
  //res.send('ok');

  //res.render('sbadmin2/cocktail_feedback_given', jadeData);
  //res.end();
}
exports.send = send;

/**
 * Show the recommendation from the operator
 *
 * @param req
 * @param res
 */
function recommendation(req, res) {
  var jadeData = undefined;

  res.render('sbadmin2/cocktail_recommendation', jadeData);
  res.end();
}
exports.recommendation = recommendation;