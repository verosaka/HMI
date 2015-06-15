var Q = require('q');

mi5database = function() {
  var mongoose = require('mongoose-q')();

  mi5Logger.info('Mi5 - Database loaded');

  // Connect to database
  try {
    mongoose.connect(CONFIG.DatabaseHost);
  } catch(err){
    console.log(err);
  }
  mi5Logger.info('Database connected');

  // Create the Order-Scheme
  var orderSchema = mongoose.Schema({
    taskId          : [Number]
    , recipeId      : [Number]
    , parameters    : [Number]
    , date          : { type: Date, default: Date.now }
  });
  this.Order = mongoose.model('Order', orderSchema);
};
exports.mi5database = new mi5database();

/**
 * Save an order
 *
 * @param taskId [int]
 * @param recipeId [int]
 * @param userParameters [array_handlePostParameters]
 * @returns Promise
 */
mi5database.prototype.saveOrder = function(taskId, recipeId, userParameters){
  var self = this;
  var order = {taskId: taskId,
              recipeId: recipeId,
              parameters: userParameters};

  var NewOrder = new self.Order(order);
  mi5Logger.info('new order:'+order);
  return NewOrder.saveQ();
}