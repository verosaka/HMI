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
function sendFeedback(req, res){
  var jadeData = {};

  var taskId = parseInt(req.params.taskId, 10);
  jadeData.taskId = taskId;

  mi5Cloud.publish('/mi5/showcase/cocktail/user/feedback','TestNachricht - HMI - sendFeedback - TaskId: ' + taskId);
  mi5Logger.info('mi5MQTT - published feedback for taskId: ' + taskId);

  mi5Database.saveOrder(taskId, 10051, [1,2,3]);

  //res.render('sbadmin2/cocktail_feedback_given', jadeData);
  res.end();
}
exports.sendFeedback = sendFeedback;

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