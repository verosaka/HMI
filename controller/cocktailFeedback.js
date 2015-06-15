/**
 * @description Cocktail-Feedback - Give and Receive feedback, show the result
 *
 * @author Thomas Frei
 * @date 2015-06-15
 */

/**
 * Give Feedback to a cocktail
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