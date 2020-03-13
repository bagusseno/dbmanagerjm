"use strict";

module.exports = function(app) {

    // controller classes
    // view controllers
	var user_public_controller = require("../app/controllers/user_public_controller.js")
    var user_admin_controller = require("../app/controllers/user_admin_controller.js")
    
	// user public views
	app.all("/login", user_public_controller.login)
	app.all("/register", user_public_controller.register)
	app.all("/presencing/:event_id", user_admin_controller.presence_board)

	// user admin views
	app.all("/admin/dashboard", user_admin_controller.dashboard)
	app.all("/admin/manage/audience-databases", user_admin_controller.manage_all_audience_head)
	app.all("/admin/manage/audience-databases/:audience_head_id", user_admin_controller.manage_all_audience)
	app.all("/admin/manage/event-heads", user_admin_controller.manage_all_event_head)
	app.all("/admin/manage/event-heads/:event_head_id", user_admin_controller.manage_all_event)
	app.all("/admin/manage/meta/:audience_head_id", user_admin_controller.manage_all_audience_meta_index)

	// function routes
	app.all("/admin/logout", user_admin_controller.logout)

};
