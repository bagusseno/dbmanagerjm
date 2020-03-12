"use strict";

module.exports = function(app) {
  // controller classes
  var user_public_controller = require("../controllers/views/user_public_controller.js");

  // user public views
  app.get("/login", user_public_controller.login);
  app.get("/register", user_public_controller.registration);
};
