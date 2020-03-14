'use strict'

var user_model = require('../models/user_model.js')
var audience_head_model = require('../models/audience_head_model.js')
var audience_model = require('../models/audience_model.js')
var audience_meta_index_model = require('../models/audience_meta_index_model.js')
var audience_meta_value_model = require('../models/audience_meta_value_model.js')
var event_head_model = require('../models/event_head_model.js')

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

exports.manage_all_event_head = async (req, res) => {

    if(req.method == 'POST') {

        // API: Create
        switch(req.body.action) {

            case 'create':                

                if(isset(req.body.user_id, req.body.name, req.body.type)) {

                    var query = await event_head_model.add({
                        user_id: req.body.user_id,
                        name: req.body.name,
                        type: req.body.type
                    })
                    
                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    console.log('tset');
                    
                }

                break

            case 'update':

                if(isset(req.body.id, req.body.name)) {

                    var query = await event_head_model.update(req.body.id, {
                        name: req.body.name,
                        type: req.body.type
                    })

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

                break

            case 'delete':

                if(isset(req.body.id)) {

                    var query = await event_head_model.remove(req.body.id)                            

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

        }   
    }

    res.render('user_admin/managements/manage_all_event_head', {
        page_title: 'Manage all audience head'
    })
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

exports.manage_all_audience = async (req, res) => {
    
    if(req.method == 'POST') {

        // API: Create
        switch(req.body.action) {

            case 'create':

                if(isset(req.body.audience_head_id, req.body.name)) {
                    
                    var audience_meta_indexes = await audience_meta_index_model.get_all_by_audience_head_id(req.body.audience_head_id)
                    
                    var audience_id = await audience_model.add({
                        audience_head_id: req.body.audience_head_id,
                        name: req.body.name
                    })
                    
                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if(query && req.body.audience_meta_values != null) {
                        
                        for(var i = 0; i < req.body.audience_meta_values.length; i++) {

                            var audience_meta_value_query = await audience_meta_value_model.add({
                                audience_id: audience_id,
                                audience_meta_index_id: req.body.audience_meta_indexes[i],
                                value: req.body.audience_meta_values[i]
                            })

                            if(!audience_meta_value_query) 
                                req.flash('query_status', 'failed')
                        }
                    }
                }

                break

            case 'update':

                if(isset(req.body.id, req.body.audience_head_id, req.body.name)) {

                    var query = await audience_model.update(req.body.id, {
                            audience_head_id: req.body.audience_head_id,
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

                    var query = await audience_model.remove(req.body.id)                            

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

        }   
    }

    var audience_meta_indexes = await audience_meta_index_model.get_all_by_audience_head_id(req.params.audience_head_id)

    res.render('user_admin/managements/manage_all_audience_meta_index', {
        page_title: 'Manage all meta',
        audience_meta_indexes: audience_meta_indexes
    })
}

exports.manage_all_audience_meta_index = async (req, res) => {
    
    if(req.method == 'POST') {

        // API: Create
        switch(req.body.action) {

            case 'create':

                if(isset(req.body.event_head_id, req.body.name)) {
                    
                    var query = await audience_meta_index_model.add({
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

                    var query = await audience_meta_index_model.update(req.body.id, {
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

                    var query = await audience_meta_index_model.remove(req.body.id)                            

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

        }   
    }

    var audience_meta_index = await audience_meta_index_model.get_all_by_event_head_id(req.params.event_head_id)

    res.render('user_admin/managements/manage_all_audience_meta_index', {
        page_title: 'Manage all meta',
        audience_meta_index: audience_meta_index
    })
}

exports.presence_board = (req, res) => {
    
    res.render('user_admin/views/presence')
}