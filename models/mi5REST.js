var Q = require('q');
var _ = require('underscore');
var request = require('request');

/**
 *
 */
mi5rest = function() {
  // check if host is online
  var self = this;
  
  try {
    self._checkServer('https://mi5.itq.de/helloWorld')
	  .then(function(res, body){
	    console.log(res, body);
		console.log('REST API started');
		})
	  .catch(console.log);
  } catch(err){
    console.log('catch',err);
  }

};

// This is needed, since mi5rest constructor is synchronous, its promised-
// based API not. otherwise: ZALGO!
setTimeout(function(){
  var instance = new mi5rest();
  exports.instance = instance;
},0);

mi5rest.prototype.saveOrder = function(taskId, recipeId, userParameters){
  var self = instance;

  var order = {taskId: taskId,
    recipeId: recipeId,
    parameters: userParameters};

  mi5Logger.info('new order saved to database:'+JSON.stringify(order,' '));
  return NewOrder.saveQ();
};

mi5rest.prototype.manageRecipe = function(recipeId, name, description, userparameters){
  var self = instance;

  var recipe = {recipeId: recipeId,
    name: name,
    description: description,
    userparameters: userparameters};

  var options = {
    url: CONFIG.RESTHost+'/manageRecipe',
    rejectUnauthoriyed: false,
    formData: {
      recipe: JSON.stringify({
        recipeId: recipeId,
        name: name,
        description: description,
        userparameters: userparameters
      });
    }
  }
  return Q.promise(function(resolve, reject){
    request.post(options, function(err, httpRes){
      if(!err){
        mi5Logger.info('recipe was managed :'+JSON.stringify(httpRes,' '));
        console.log(httpRes);
        resolve(httpRes);
      } else {
        reject(err);
      }
    });
  });
};

mi5rest.prototype._checkServer = function(host){
  var self = this;
  var deferred = Q.defer();

  // TODO: import mi5.itq.de certificate
  // http://stackoverflow.com/questions/20082893/unable-to-verify-leaf-signature
  var options = {
    url: host,
	  rejectUnauthorized: false
  };
  request.get(options, function(err, res, body){
	if(err) deferred.reject(err);

	deferred.resolve(res, body);
  });
  
  return deferred.promise;
};