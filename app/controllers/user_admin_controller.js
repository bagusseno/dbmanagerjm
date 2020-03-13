'use strict'

var user_model = require('../models/user_model.js')
var audience_head_model = require('../models/audience_head_model.js')
var audience_model = require('../models/audience_model.js')
var meta_index_audience_model = require('../models/meta_index_audience_model.js')

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

exports.manage_all_audience_head = async (req, res) => {
    
    if(req.method == 'POST') {

        // API: Create
        switch(req.body.action) {

            case 'create':

                if(isset(req.body.name, req.body.user_id)) {

                    var query = await audience_head_model.add({
                        name: req.body.name,
                        user_id: req.body.user_id
                    })
                    
                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

                break

            case 'update':

                if(isset(req.body.id, req.body.name)) {

                    var query = await audience_head_model.update(req.body.id, {name: req.body.name})

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

                break

            case 'delete':

                if(isset(req.body.id)) {

                    var query = await audience_head_model.remove(req.body.id)                            

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

        }   
    }

    res.render('user_admin/managements/manage_all_audience_head', {
        page_title: 'Manage all audience head'
    })
}

exports.manage_all_audience = (req, res) => {

}

exports.manage_all_meta_index_audience = async (req, res) => {
    
    if(req.method == 'POST') {

        // API: Create
        switch(req.body.action) {

            case 'create':

                if(isset(req.body.event_head_id, req.body.name)) {
                    
                    var query = await meta_index_audience_model.add({
                        event_head_id: req.body.event_head_id,
                        name: req.body.name
                    })
                    
                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

                break

            case 'update':

                if(isset(req.body.id, req.body.event_head_id, req.body.name)) {

                    var query = await meta_index_audience_model.update(req.body.id, {
                            event_head_id: req.body.event_head_id,
                            name: req.body.name
                        })

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

                break

            case 'delete':

                if(isset(req.body.id)) {

                    var query = await meta_index_audience_model.remove(req.body.id)                            

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

        }   
    }

    var meta_index_audience = await meta_index_audience_model.get_all_by_event_head_id(req.params.event_head_id)

    res.render('user_admin/managements/manage_all_meta_index_audience', {
        page_title: 'Manage all meta',
        meta_index_audience: meta_index_audience
    })
}

exports.presence_board = (req, res) => {
    
    res.send('')
}