/**
 * Cocktail-Feedback - Give and Receive feedback, show the result
 *
 * @author Thomas Frei
 * @date 2015-06-15
 */
var Q = require('q');
/**
 * Listen to the recommendations and trigger socket event
 */
mi5Cloud.listenCB('/mi5/showcase/cocktail/operator/recommendation', function(recommendation){
  console.log('recommendation caught: ', recommendation);
  mi5Database.saveRecommendation(recommendation).fail(console.log);
});

/**
 * Show Feedback GUI for the last cocktail
 *
 * @param req
 * @param res
 */
function index(req, res) {
  var jadeData = {};

  mi5Database.getLastOrder()
    .then(function(order){
      jadeData.order = order;

      res.render('sbadmin2/cocktail_feedback', jadeData);
      res.end();
    })
    .catch(function (e) {
      console.error(e);
      res.status(500, {
        error: e
      });
    });

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

  // generate a dummy order
  //mi5Database.saveOrder(1501, 10051, [200 ,11,34, 42]);

  mi5Database.getOrder(taskId)
    .then(function(order){
      var feedback = JSON.stringify(parseFeedback(order));
      console.log(feedback);
      jadeData.feedback = feedback;
      jadeData.order = order;
      mi5Cloud.publish('/mi5/showcase/cocktail/user/feedback', feedback);
      mi5Logger.info('mi5MQTT - published feedback for taskId: ' + taskId);

      try {
        res.render('sbadmin2/cocktail_feedback_given', jadeData);
        res.end();
      } catch(err){
        throw err;
      }
    })
    .catch(function (e) {
      console.error(e);
      res.status(500, {
        error: e
      });
    });
  //mi5Database.getLastTaskId().done(console.log);
  //mi5Database.getLastOrder().done(console.log);
  //mi5Database.getLastTaskId().then(mi5Database.getOrder).done(console.log);
  //mi5Database.getLastOrder().done(console.log);

  //res.render('sbadmin2/cocktail_feedback_given', jadeData);
  //res.end();
}
exports.send = send;

function consoleLogQ(mix){
  var deferred = Q.defer();
  deferred.resolve(mix);
  console.log('PromiseChain:',mix);
  return deferred.promise;
}
/**
 * Show the recommendation from the operator
 *
 * @param req
 * @param res
 */
function recommendation(req, res) {
  var jadeData = {};

  mi5Database.getLastTaskId()
    .then(consoleLogQ)
    .then(mi5Database.getRecommendation)
    .then(consoleLogQ)
    .then(function(recommendation){
      if(typeof recommendation == 'undefined') throw 'no recommendation found';
      jadeData.recommendation = recommendation;
      console.log(recommendation);

      res.render('sbadmin2/cocktail_recommendation', jadeData);
      res.end();
    })
    .catch(function (e) {
      console.error(e);
      res.send(e);
      res.end();
    });
}
exports.recommendation = recommendation;








function parseFeedback(order){
  var template = {
    "productId": 0, // overwrite with taskId
    "timestamp": "2015-05-01T14:02:05",
    "recipe": {
      "id": 0, // overwrite with recipeId
      "name": "" // overwrite with recipe name from recipe database
    },
    "order": {
      "amount": 0, // overwrite with userparameter[0]
      "mixRatio": {
        "ingredientName": ["Orange", "Passion Fruit", "Grenadine Syrup"],
        "ratio": [0, 0, 0] // overwrite with userparameter[1,2,3]
      }
    },
    "review": {
      "like": false,
      "feedback": "Too sweet" // future overwrite
    }
  };

  template.productId = order.taskId;
  template.recipe.id = order.recipeId;

  if(10051 == order.recipeId){
    template.recipe.name = 'Free Passion';
  } else {
    template.recipe.name = 'Recipelist';
  }

  template.order.amount = order.parameters.shift();

  // Free Passion: 10051 default: // TODO get the default ratios from a database
  var defaultRatio = [50,35,10];
  // Calculate percentage according to mixRatio
  console.log(order.parameters);
  order.parameters.forEach(function(val, key){
    template.order.mixRatio.ratio[key] = val * defaultRatio[key];
  });
  var sumRatio = template.order.mixRatio.ratio.reduce(sum);
  console.log( template.order.mixRatio.ratio);
  // Calculate it to ratio in percent of 1
  template.order.mixRatio.ratio.forEach(function(val, key){
    template.order.mixRatio.ratio[key] = Math.floor((val / sumRatio)*100)/100; // TODO might be 1 - 0.03 (3x floor)
  });
  console.log(template.order.mixRatio.ratio);

  // Order the ingredients smallest first (donut charts best practice) ------------------------------------------
  // generate sortable array: {ingredient: 'orange', ratio: 0.4},{ingredient: 'passion fruit', ratio: 0.2}...
  var ingredients = [];
  template.order.mixRatio.ingredientName.forEach(function(val,key){
    ingredients.push({ingredient: val, ratio: template.order.mixRatio.ratio[key]});
  });
  ingredients = _.sortBy(ingredients, 'ratio');
  // copy it back to the template
  ingredients.forEach(function(val,key){
    template.order.mixRatio.ingredientName[key] = val.ingredient;
    template.order.mixRatio.ratio[key] = val.ratio;
  });

  return template;
}

function sum(a,b){
  return parseInt(a,10)+parseInt(b,10);
}

/*
function parseRecommendation(recommendation){
  var template = {
    "productId": 223,
    "timestamp": "2015-05-01T14:02:05",
    "recipe": {
      "id": 10051,
      "name": "Free Passion"
    },
    "order": {
      "amount": 127,
      "mixRatio": {
        "ingredientName": ["Orange", "Passion Fruit", "Grenadine Syrup"],
        "ratio": [0.4, 0.5, 0.1]
      }
    },
    "review": {
      "like": false,
      "feedback": "Too sweet"
    },
    "recommendation": {
      "mixRatio": {
        "ingredientName": ["Orange", "Passion Fruit", "Grenadine Syrup"],
        "ratio": [0.10, 0.75, 0.15]
      }
    }
  };
  return template;
}

var realOrder={
  "productId":2004,
  "timestamp":"2015-05-01T14:02:05",
  "recipe":{
    "id":10051,
    "name":"Free Passion"
  },
  "order":{
    "amount":56,
    "mixRatio": {
      "ingredientName":["Orange","Passion Fruit","Grenadine Syrup"],
      "ratio":[0.6043956043956044,0.10622710622710622,0.2893772893772894]}
  },
  "review":{
    "like":false,"feedback":"Too sweet"}
};
*/