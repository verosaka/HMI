/**
 * Returns the corresponding datatype for a variable for an Mi5-Order
 * 
 * @param variableName
 * @returns {String}
 */
function Mi5Order(variableName) {
  assert(typeof variableName === "string");
  var type;

  switch (variableName) {
  case "Name":
  case "Description":
    type = 'String';
    break;
  case "RecipeID":
  case "TaskID":
    type = 'Int16';
    break;
  case "Value":
    type = 'Float';
    break;
  case "Locked":
  case "Pending":
    type = 'Boolean';
    break;
  default:
    console.log('According to the Orderlist, the given variableName does not exist');
    // assert(false);
    break;
  }

  return type;
}
exports.Mi5Order = Mi5Order;

/**
 * Write: Order[0].Pending
 * 
 * @param variableName
 * @returns {String}
 */
function Mi5DebugPendingFalse(variableName) {
  assert(typeof variableName === "string");
  var type;

  switch (variableName) {
  case "Pending":
    type = 'Boolean';
    break;
  default:
    console.log('According to the Orderlist, the given variableName does not exist');
    break;
  }

  return type;
}
exports.Mi5DebugPendingFalse = Mi5DebugPendingFalse;

function Mi5OrderUserParameter(variableName) {
  assert(typeof variableName === "string");
  var type;

  switch (variableName) {
  case "Value":
    type = 'Float';
    break;
  default:
    console.log('According to the Orderlist, the given variableName does not exist');
    // assert(false);
    break;
  }

  return type;
}
exports.Mi5OrderUserParameter = Mi5OrderUserParameter;

function Mi5MessageFeed(variableName) {
  assert(typeof variableName === "string");
  var type;

  switch (variableName) {
  case "ID":
  case "Level":
    type = 'Int16';
    break;
  case "Message":
  case "Timestamp":
    type = 'String';
    break;
  default:
    console.log('According to the Orderlist, the given variableName does not exist');
    // assert(false);
    break;
  }

  return type;
}
exports.Mi5MessageFeed = Mi5MessageFeed;

function Mi5ManualModule(variableName) {
  assert(typeof variableName === "string");
  var type;

  switch (variableName) {
  case "Execute":
  case "Ready":
  case "Busy":
  case "Done":
  case "Error":
    type = 'Boolean';
    break;
  case "ErrorID":
  case "SkillID":
  case "TaskID":
    type = 'Int16';
    break;
  case "SkillDescription":
    type = 'String';
    break;
  case "Position":
  case "PositionOutput":
    type = 'Double';
    break;
  default:
    console.log('According to the ManualModule List, the given variableName does not exist');
    // assert(false);
    break;
  }

  return type;
}
exports.Mi5ManualModule = Mi5ManualModule;

/**
 * Module Interface list Input/Output Module in Mi5 scope
 * 
 * TODO: update list to all variables, now only needed ones are filled
 * 
 * @param variableName
 * @returns {String}
 */
function Mi5ModuleInterface(variableName) {
  assert(typeof variableName === "string");
  var type;

  switch (variableName) {
  case "Dummy":
  case "Connected":
  case "Activated":
  case "Execute":
  case "Ready":
  case "Busy":
  case "Done":
  case "Error":
    type = 'Boolean';
    break;
  case "ErrorID":
  case "SkillID":
  case "ID":
    type = 'UInt16';
    break;
  case "SkillDescription":
    type = 'String';
    break;
  case "PositionOutput":
    type = 'Double';
    break;
  default:
    console
        .log('According to the Input Output ModuleInterface list, the given variableName does not exist');
    // assert(false);
    break;
  }

  return type;
}
exports.Mi5ModuleInterface = Mi5ModuleInterface;