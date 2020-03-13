"use strict";

module.exports = function(app) {
  // controller classes
  var user_public_controller = require("../controllers/user_public_controller.js");
  var user_admin_controller = require("../controllers/user_admin_controller.js");

  // user public views
  app.get("/login", user_public_controller.login);
  app.get("/register", user_public_controller.register);
  app.get("/presence_board", user_admin_controller.presence_board);

  // user admin views
  app.get("/dashboard", user_admin_controller.dashboard);
};
