'use strict'

var user_model = require('../models/user_model.js')

exports.dashboard = (req, res) => {

    res.render('user_admin/views/dashboard', {
        page_title : "Pengajian Pernak Pernik",
        current_user: {
            username    : "Abu Abdirohman",
            photo       : "default.jpeg"
        }
    });
}

exports.logout = (req, res) => {

    req.session.current_user = null
    res.redirect('/login')
}

exports.manage_all_event_head = (req, res) => {

}

exports.manage_all_event = (req, res) => {
    
}

exports.manage_event = (req, res) => {
    
}

exports.manage_all_audience_by_event_head_id = (req, res) => {
    
}

exports.manage_all_audience_by_audience_head_id = (req, res) => {
    
}

exports.manage_audience = (req, res) => {
    
}

exports.manage_all_audience_head = (req, res) => {
    
    if(req.method == 'GET') {

        res.render('/user_admin/managements/manage_all_audience_head')
    }
}

exports.manage_all_audience = (req, res) => {
    
}

exports.manage_all_meta_index = (req, res) => {
    
}

exports.presence_board = (req, res) => {

    res.render('user_public/presence_board')
}