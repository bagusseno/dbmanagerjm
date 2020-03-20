"use strict";

module.exports = function(app) {

    // controller classes
    // view controllers
	var user_public_controller = require("../app/controllers/user_public_controller.js")
    var user_admin_controller = require("../app/controllers/user_admin_controller.js")
    var user_admin_api_controller = require("../app/controllers/user_admin_api_controller.js")
    
	// user public views
	app.all("/login", user_public_controller.login)
	app.all("/register", user_public_controller.register)
	app.all("/presence/:event_id", user_admin_controller.presence)

	// user admin views
	app.all("/admin/dashboard", user_admin_controller.dashboard)

	// user admin views and managements
	app.all("/admin/manage/audience-databases/:audience_head_id", multer.any(), user_admin_controller.manage_all_audience)
	app.all("/admin/manage/event-heads", user_admin_controller.manage_all_event_head)
	app.all("/admin/manage/event-heads/:event_head_id", user_admin_controller.manage_all_event)

	// user APIs
	app.post("/admin/api/presence", user_admin_api_controller.presence)

	// meta views
	app.all("/admin/manage/meta/:audience_head_id", user_admin_controller.manage_all_audience_meta_index)

	// function routes
	app.all("/admin/logout", user_admin_controller.logout)

};
