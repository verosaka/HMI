/**
 * Service Skill Interface
 * 
 * Get the service skill data and handle the user interaction with the module.
 * 
 * @author Thomas Frei
 * @date 2015-03-14
 */

function index(req, res) {
  var jadeData = new Object;

  // mi5ServiceSkills.getModuleData(function(err) {
  var err; // undefined - just for debugging
  if (err) {
    console.log(err);
  }

  // console.log(mi5Manual.jadeData);

  // var outputSockets = _.once(mi5Output.ioRegister);
  // io.on('connection', function(socket) {
  // socket.join('output-module');
  // outputSockets(socket);
  // });

  // jadeData.module = mi5ServiceSkills.jadeData;
  jadeData = mockdata;

  // console.log(JSON.stringify(jadeData, null, 1));
  // console.log(mi5Input.jadeData.SkillOutput[0].Busy);

  res.render('sbadmin2/service_skill_interface', jadeData);
  // });

}
exports.index = index;

var mockdata = {
  error : '',
  module : {
    name : 'hi'
  }
};