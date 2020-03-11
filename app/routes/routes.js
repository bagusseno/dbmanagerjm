"use strict";

module.exports = function(app) {
  // controller classes
  var dummy_controller = require("../controllers/dummy_controller.js");

  // dummy
  app.get("/unit-testing/login", dummy_controller.show);
};
