"use strict";

module.exports = function(app) {
  // controller classes
  var dummy_controller = require("../controllers/dummy_controller.js");

<<<<<<< HEAD
    // controller classes
    var unit_testing_controller = require('../controllers/other_controllers/unit_testing_controller.js')

    app.get('/unit-testing/test', unit_testing_controller.test)

}
=======
  // dummy
  app.get("/unit-testing/login", dummy_controller.show);
};
>>>>>>> 9d8f760356c9a4cdb13246eaff376d6c96f15599
