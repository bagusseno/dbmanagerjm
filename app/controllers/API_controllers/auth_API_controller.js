'use strict'

var template_engine = require('../../../libs/template_engine_lib.js')
var user_model = require('../../models/user_model.js')
var presence_model = require('../../models/presence_model.js')

exports.login = (req, res) => {
    
    template_engine.render(res, 'auth/login')
}

exports.registration = (req, res) => {
    
}