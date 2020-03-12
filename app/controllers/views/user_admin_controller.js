'use strict'

var user_model = require('../../models/user_model.js')

exports.dashboard = (req, res) => {

    res.render('user_admin/views/dashboard', {
        title_event : "Pengajian Pernak Pernik",
        current_user: {
            username    : "Abu Abdirohman",
            photo       : "default.jpeg"
        }
    });
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
    
}

exports.manage_all_audience = (req, res) => {
    
}

exports.manage_all_meta_index = (req, res) => {
    
}