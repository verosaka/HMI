// Configuration
GLOBAL.CONFIG = require('./../config.js');

// Logger
GLOBAL.mi5Logger = require('./../models/mi5Logger').logger;
mi5Logger.start();

// Mi5 Database Model - MongoDB
GLOBAL.mi5Database = require('./../models/mi5Database').instance;
mi5Database.getLastTaskId().then(function(taskId){
  CONFIG.TaskId = taskId;
  console.log('current taskId: ', CONFIG.TaskId);
});

//mi5Database.getRecipe(10001)
//  .then(function(recipe){
//    // if there is no recipe with this id
//    if(typeof recipe == 'undefined'){
//
//    }
//    console.log(recipe);
//  })
//  .fail(function(err){
//    console.log('getRecipe.fail',err);
//  });
//mi5Database.saveRecipe(10001, 'Test', 'Descriptiontext', {foo: 'bar'})
//  .then(function(log){
//    console.log(log);
//  })
//  .fail(function(err){
//    console.log('err',err);
//  });

mi5Database.manageRecipe(10001, 'Toms Liebling', 'Descasdfsadfription istasdf intere', {})
.then(function(aha){
    console.log(aha);
  })
.fail(function(err){
    console.log('err', err);
  });