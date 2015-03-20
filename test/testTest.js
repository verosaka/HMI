/**
 * Run the test in a command prompt in the Beta04_hmiDeveleopment folder:
 * HMI\Beta04_hmiDevelopment\mocha ./test/testTest.js
 * 
 * @author Thomas Frei
 * @date 2015-03-17
 */

var assert = require('assert');
var should = require('should'); // For Testing

function subtractOne(number){
  if(typeof number !== 'number'){
    return false;
  }
  
  var result = number-1;
  if(result < 0){
    return false;
  } else {
    return result;
  }
}

describe('opcuaInstance', function() {

  describe('subtractOne()', function() {

    it('should correctly subtract one from the given number', function() {
      subtractOne(4).should.equal(3);
    });
    it('should return false, if the result would be less than 0', function(){
      subtractOne(0).should.be.false;
    })
    it('should return false, when called with a string', function(){
      assert(false === subtractOne('hiho'));
    })
    it('should return false, when called with an object', function(){
      assert(false === subtractOne({ho:2}));
    })
    it('should return false, when called with a function', function(){
      assert(false === subtractOne(function(){}));
    })

  });

});
