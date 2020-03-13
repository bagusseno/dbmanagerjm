'use strict'

var user_model = require('../../models/user_model.js')
var presence_model = require('../../models/presence_model.js')

exports.login = (req, res) => {
    
    res.render('auth/login')
}

exports.registration = (req, res) => {

    res.render('auth/register')
}

exports.presence_board = (req, res) => {

    res.render("user_public/presence_board", {
        title_event : "Pengajian Pernak Pernik",
        current_user: {
            username    : "Abu Abdirohman",
            photo       : "default.jpeg"
        }
    });
}