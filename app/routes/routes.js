'use strict'

module.exports = function(app) {

    // controller classes
    var unit_testing_controller = require('../controllers/other_controllers/unit_testing_controller.js')

    app.get('/unit-testing/test', unit_testing_controller.test)

}
