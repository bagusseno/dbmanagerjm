"use strict";

module.exports = function(app) {

    // controller classes
    // view controllers
	var user_public_controller = require("../app/controllers/user_public_controller.js")
    var user_admin_controller = require("../app/controllers/user_admin_controller.js")
    var user_admin_api_controller = require("../app/controllers/user_admin_api_controller.js")
    
	// user public views
	app.all("/login", user_public_controller.login)
	
	// user admin views
	app.all("/admin/dashboard", user_admin_controller.dashboard)

	// user admin views and managements
	app.all("/admin/manage/members", multer.any(), user_admin_controller.manage_all_members)
	app.all("/admin/manage/attributes", multer.any(), user_admin_controller.manage_all_member_meta_indexes)

	// user admin apis
	app.all("/admin/api/update-cell", user_admin_api_controller.update_cell)
	app.all("/admin/api/delete-member", user_admin_api_controller.delete_member)
	app.all("/admin/api/add-family-member", user_admin_api_controller.add_family_member)
	app.all("/admin/api/remove-family-head", user_admin_api_controller.remove_family_head)
	app.all("/admin/api/remove-from-family", user_admin_api_controller.remove_from_family)
	app.all("/admin/api/update-family", user_admin_api_controller.update_family)
	app.all("/admin/api/add-member", user_admin_api_controller.add_member)

	// meta views
	app.all("/admin/manage/meta/:member_head_id", user_admin_controller.manage_all_member_meta_indexes)

	// function routes
	app.all("/admin/logout", user_admin_controller.logout)

};
