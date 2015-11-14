/**
 * Input Module Controller
 */

function index(req, res) {
  var jadeData = new Object;

  mi5InputBarcode.getModuleData(function(err) {
    if (err) {
      console.log(err);
    }

    // console.log(mi5Manual.jadeData);

    var inputSockets = _.once(mi5InputBarcode.ioRegister);
    io.on('connection', function(socket) {
      socket.join('input-barcode-module');
      inputSockets(socket);
    });

    jadeData.module = mi5InputBarcode.jadeData;

    // console.log(JSON.stringify(jadeData, null, 1));
    // console.log(mi5Input.jadeData.SkillOutput[0].Busy);

    res.render('sbadmin2/input_barcode_module', jadeData);
  });

}
exports.index = index;