"use strict";

var template_engine = require("../libs/template_engine_lib.js");
var user_model = require("../models/user_model.js");
var path = require("path");

exports.show = (req, res) => {
  template_engine.render(res, "templates/header", { base_url: __dirname });
  template_engine.render(res, "auth/login", { base_url: __dirname });
};
