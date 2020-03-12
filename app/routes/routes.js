"use strict";

module.exports = function(app) {
  // controller classes
  var unit_testing_controller = require("../controllers/other_controllers/unit_testing_controller.js");

  // dummy
  app.get("/unit-testing/login", unit_testing_controller.show);
};
