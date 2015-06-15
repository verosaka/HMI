/**
 * Looger Class
 * 
 * @returns
 */
var fs = require('fs');
var moment = require('moment');

logger = function() {
  // Configuration where to log to
  this.LogToFile = true;
  this.LogToConsole = true;

  // Define output file
  this.path = './app.log';
};
exports.logger = new logger();

/**
 * LOG: STARTUP - app.js launched
 */
logger.prototype.start = function() {
  var self = this;

  self.info('STARTUP - app.js launched ===========================');
};

/**
 * LOG: 'INFO - message'
 *
 * @param message
 */
logger.prototype.info = function(message){
  var self = this;

  self.log('INFO - ' + message);
}

/**
 * LOG: 'ERROR - message'
 *
 * @param message
 */
logger.prototype.error = function(message){
  var self = this;

  self.log('ERROR - ' + message);
}

/**
 * Log to console, file or any other option
 * @param message
 */
logger.prototype.log = function(message){
  var self = this;

  // Log to Console
  if( self.LogToConsole ){
    console.log(message);
  }

  // Log to File (this.path)
  if( self.LogToFile ){
    self.append(message);
  }
}

/**
 * Append message to the log-file
 *
 * @param message
 */
logger.prototype.append = function(message) {
  var self = this;

  fs.appendFile(self.path, moment().format() + ' - ' + message + "\n", function(err) {
    if (err) {
      console.log(err);
    }
  });
}