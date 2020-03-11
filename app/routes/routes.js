'use strict'

module.exports = function(app) {

    // controller classes
    var User_area_controller = require('../controllers/user_admin_controller.js')

    app.get('/unit-testing/get-all-users', User_area_controller.get_all)

}
