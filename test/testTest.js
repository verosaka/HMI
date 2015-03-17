var assert = require('assert');
var should = require('should'); // For Testing

function subtractOne(number){
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
      assert(3 == subtractOne(4));
    });
    it('should return false, if the result would be less than 0', function(){
      assert(false === subtractOne(0));
    })

  });

});
