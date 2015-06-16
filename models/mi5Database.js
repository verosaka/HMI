var Q = require('q');

mi5database = function() {
  this.mongoose = require('mongoose-q')();

  mi5Logger.info('Mi5 - Database loaded');

  // Connect to database
  try {
    this.mongoose.connect(CONFIG.DatabaseHost);
  } catch(err){
    console.log(err);
  }
  mi5Logger.info('Database connected');

  // Create the Order-Schemea
  var orderSchema = this.mongoose.Schema({
    taskId          : [Number]
    , recipeId      : [Number]
    , parameters    : [Number]
    , date          : { type: Date, default: Date.now }
  });
  this.Order = this.mongoose.model('Order', orderSchema);
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

mi5database.prototype.getOrder = function(taskId){
  var self = this;

  return self.Order.findQ({taskId: taskId});
}