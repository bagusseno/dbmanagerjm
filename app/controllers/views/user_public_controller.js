'use strict'

var user_model = require('../../models/user_model.js')
var presence_model = require('../../models/presence_model.js')

exports.login = (req, res) => {
    
    res.render('auth/login')
}

exports.registration = (req, res) => {

    res.render('auth/register')
}