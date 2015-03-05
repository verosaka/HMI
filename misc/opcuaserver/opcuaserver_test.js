/**
 * New node file
 */

var opcuaserver = new require("./opcuaserver.js");
var testserver = new opcuaserver(1337,2501);

testserver.createServer();
//testserver.createFolder('RootFolder', 'Module2501');
testserver.initializeServer();