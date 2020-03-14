'use strict'

var fs = require('fs')
var csv_string = require('csv-string')

var audience_head_model = require('../models/audience_head_model.js')
var audience_model = require('../models/audience_model.js')
var audience_meta_index_model = require('../models/audience_meta_index_model.js')
var audience_meta_value_model = require('../models/audience_meta_value_model.js')
var event_head_model = require('../models/event_head_model.js')
var event_model = require('../models/event_model.js')
var presence_model = require('../models/presence_model.js')

// user public
exports.dashboard = (req, res) => {

    res.render("user_admin/views/dashboard", {
      page_title: "Pengajian Pernak Pernik",
      req: req
    });
}

exports.presence_board = async (req, res) => {
    
    if(req.method == 'POST') {

        switch(req.body.action) {

            case 'presence':

                if(isset(req.body.audience_id, req.body.event_id)) {

                    var query = await presence_model.add({
                        audience_id: req.body.audience_id,
                        event_id: req.body.event_id,
                        status: 'present' 
                    })

                    if(query)
                        req.flash('query_status', 'success')
                    else    
                        req.flash('query_status', 'failed')
                }

            case 'permit':

                if(isset(req.body.audience_id, req.body.event_id)) {

                    var query = await presence_model.add({
                        audience_id: req.body.audience_id,
                        event_id: req.body.event_id,
                        status: 'permit' 
                    })

                    if(query)
                        req.flash('query_status', 'success')
                    else    
                        req.flash('query_status', 'failed')
                }

        }
    }


    // get all audiences data based on event head id
    var audiences = await audience_model.get_all_by_event_id(req.params.event_id)

    res.render("user_admin/views/presence_board", {
        page_title: "Presensi",
        audiences: audiences,
        req: req
    });
}

// logout
exports.logout = (req, res) => {

    req.session.current_user = null
    res.redirect('/login')
}

// event heads and events
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

    res.render("user_admin/managements/manage_all_event_head", {
      page_title: "Manage all audience heads",
      req: req
    });
}

exports.manage_all_event = async (req, res) => {
    
    if(req.method == 'POST') {

        // API: Create
        switch(req.body.action) {

            case 'create':                

                if(isset(req.body.event_head_id, req.body.date, req.body.time, req.body.note)) {

                    var query = await event_model.add({
                        event_head_id: req.body.event_head_id,
                        date: req.body.date,
                        time: req.body.time,
                        note: req.body.note
                    })
                    
                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    console.log('tset');
                    
                }

                break

            case 'update':

                if(isset(req.body.id, req.body.date, req.body.time, req.body.note)) {

                    var query = await event_model.update(req.body.id, {
                        date: req.body.date,
                        time: req.body.time,
                        note: req.body.note
                    })

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

                break

            case 'delete':

                if(isset(req.body.id)) {

                    var query = await event_model.remove(req.body.id)                            

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

        }   
    }

    res.render("user_admin/managements/manage_all_event", {
      page_title: "Manage all events",
      req: req
    });
}

exports.manage_event = async (req, res) => {
    
    if(req.method == 'POST') {

        // API: Create
        switch(req.body.action) {

            case 'create':                

                if(isset(req.body.event_head_id, req.body.date, req.body.time, req.body.note)) {

                    var query = await event_model.add({
                        event_head_id: req.body.event_head_id,
                        date: req.body.date,
                        time: req.body.time,
                        note: req.body.note
                    })
                    
                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    console.log('tset');
                    
                }

                break

            case 'update':

                if(isset(req.body.id, req.body.date, req.body.time, req.body.note)) {

                    var query = await event_model.update(req.body.id, {
                        date: req.body.date,
                        time: req.body.time,
                        note: req.body.note
                    })

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

                break

            case 'delete':

                if(isset(req.body.id)) {

                    var query = await event_model.remove(req.body.id)                            

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

        }   
    }

    res.render("user_admin/managements/manage_event", {
        page_title: "Manage event",
        req: req
    });
}

// audience heads and audiences
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
        page_title: 'Manage All Audience Head',
        req: req
      }
    );
}

exports.manage_all_audience = async (req, res) => {
    
    if(req.method == 'POST') {
        
        console.log(req.file);
        
        // API: Create
        switch(req.body.action) {

            case 'create':

                if(isset(req.body.audience_head_id, req.body.name)) {
                                        
                    var audience_id = await audience_model.add({
                        audience_head_id: req.body.audience_head_id,
                        name: req.body.name
                    })
                    
                    if(audience_id)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if(audience_id && req.body.audience_meta_values != null) {
                        
                        for(var i = 0; i < req.body.audience_meta_values.length; i++) {
                            
                            var audience_meta_value_query = await audience_meta_value_model.add({
                                audience_id: audience_id,
                                audience_meta_index_id: req.body.audience_meta_indexes[i],
                                value: req.body.audience_meta_values[i]
                            })

                            if(!audience_meta_value_query) 
                                req.flash('query_status', 'failed at meta values')
                        }
                    }
                }

                break

            case 'update':

                if(isset(req.body.id, req.body.audience_head_id, req.body.name)) {

                    var audience_meta_indexes = await audience_meta_index_model.get_all_by_audience_head_id(req.body.audience_head_id)

                    var query = await audience_model.update(req.body.id, {
                        audience_head_id: req.body.audience_head_id,
                        name: req.body.name
                    })

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if(query && req.body.audience_meta_values != null) {
                    
                        for(var i = 0; i < req.body.audience_meta_values.length; i++) {
                            
                            var audience_meta_value_query = await audience_meta_value_model.custom_update({
                                audience_meta_index_id: req.body.audience_meta_indexes[i],
                                audience_id: req.body.audience_id
                            }, {
                                audience_id: audience_id,
                                audience_meta_index_id: req.body.audience_meta_indexes[i],
                                value: req.body.audience_meta_values[i]
                            })

                            if(!audience_meta_value_query) 
                                req.flash('query_status', 'fail updating meta values')
                        }
                    }
                }

                break

            case 'delete':
            
                if(isset(req.body.id)) {

                    var query = await audience_model.remove(req.body.id)                            

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if(query) {

                        var audience_meta_values_query = await audience_meta_value_model.custom_remove({
                            audience_id: req.body.id
                        })

                        if(!audience_meta_values_query)
                            req.flash('query_status', 'failed removing meta values')
                    }
                }

            case 'upload_audience_csv':

                console.log('test');
            
                if(isset(req.body.audience_meta_indexes_order)) {

                    console.log(req.files);

                    fs.readFile(req.files[0].path, async (readFile_err, audience_data) => {

                        if (readFile_err) console.log(readFile_err);                            
                                                
                        audience_data = csv_string.parse(audience_data.toString())

                        audience_meta_indexes = await audience_meta_index_model.get_all_by_audience_head_id(req.params.audience_head_id)
                        var audience_meta_indexes_order = req.body.audience_meta_indexes_order.split(',')
                        console.log(audience_meta_indexes_order);
                        console.log(audience_meta_indexes);
                        
                        var audience_meta_index_ids_order = []

                        for(var i = 0; i < audience_meta_indexes_order.length; i++) {

                            for(var j = 0; j < audience_meta_indexes.length; j++) {

                                console.log('tes' + audience_meta_indexes[j].name);
                                
                                if(audience_meta_indexes_order[i] == audience_meta_indexes[j].name) {

                                    audience_meta_index_ids_order[i] = audience_meta_indexes[j].id
                                    continue
                                }
                            }
                        }

                        console.log(audience_meta_index_ids_order);

                        
                        for(var i = 0; i < audience_data.length; i++) {
                                                        
                            var audience_data_row = audience_data[i]
                            
                            // insert the name first
                            var audience_id = await audience_model.add({
                                audience_head_id: req.params.audience_head_id,
                                name: audience_data_row[0]
                            })                            

                            if(audience_id)
                                req.flash('query_status', 'success')
                            else  
                                req.flash('query_status', 'failed')

                            if(audience_id) {

                                for(var j = 0; j < audience_meta_index_ids_order.length; j++) {

                                    var audience_meta_value_query = await audience_meta_value_model.add({
                                        audience_id: audience_id,
                                        audience_meta_index_id: audience_meta_index_ids_order[j],
                                        value: audience_data_row[j+1] // since meta values start after the name column (standardization)
                                    })

                                    if(!audience_meta_value_query)
                                        req.flash('query_status', 'failed when adding meta value')
                                }
                            }
                      }
                    })                    
                }
        }   
    }

    res.render("user_admin/managements/manage_all_audience", {
      page_title: "Manage all audience",
      req: req
    });
}

exports.manage_audience = async (req, res) => {
    
    if(req.method == 'POST') {
                
        // API: Create
        switch(req.body.action) {

            case 'create':

                if(isset(req.body.audience_head_id, req.body.name)) {
                                        
                    var audience_id = await audience_model.add({
                        audience_head_id: req.body.audience_head_id,
                        name: req.body.name
                    })
                    
                    if(audience_id)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if(audience_id && req.body.audience_meta_values != null) {
                        
                        for(var i = 0; i < req.body.audience_meta_values.length; i++) {
                            
                            var audience_meta_value_query = await audience_meta_value_model.add({
                                audience_id: audience_id,
                                audience_meta_index_id: req.body.audience_meta_indexes[i],
                                value: req.body.audience_meta_values[i]
                            })

                            if(!audience_meta_value_query) 
                                req.flash('query_status', 'failed at meta values')
                        }
                    }
                }

                break

            case 'update':

                if(isset(req.body.id, req.body.audience_head_id, req.body.name)) {

                    var audience_meta_indexes = await audience_meta_index_model.get_all_by_audience_head_id(req.body.audience_head_id)

                    var query = await audience_model.update(req.body.id, {
                        audience_head_id: req.body.audience_head_id,
                        name: req.body.name
                    })

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if(query && req.body.audience_meta_values != null) {
                    
                        for(var i = 0; i < req.body.audience_meta_values.length; i++) {
                            
                            var audience_meta_value_query = await audience_meta_value_model.custom_update({
                                audience_meta_index_id: req.body.audience_meta_indexes[i],
                                audience_id: req.body.audience_id
                            }, {
                                audience_id: audience_id,
                                audience_meta_index_id: req.body.audience_meta_indexes[i],
                                value: req.body.audience_meta_values[i]
                            })

                            if(!audience_meta_value_query) 
                                req.flash('query_status', 'fail updating meta values')
                        }
                    }
                }

                break

            case 'delete':
            
                if(isset(req.body.id)) {

                    var query = await audience_model.remove(req.body.id)                            

                    if(query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if(query) {

                        var audience_meta_values_query = await audience_meta_value_model.custom_remove({
                            audience_id: req.body.id
                        })

                        if(!audience_meta_values_query)
                            req.flash('query_status', 'failed removing meta values')
                    }
                }

        }   
    }

    res.render("user_admin/managements/manage_audience", {
      page_title: "Manage audience",
      req: req
    });
}

exports.manage_all_audience_by_event_head_id = async (req, res) => {
    
}

exports.manage_all_audience_by_audience_head_id = async (req, res) => {
    
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
        audience_meta_index: audience_meta_index, 
        req: req
      }
    )
}

exports.presence_v1 = (req, res) => {
    
    res.render('user_admin/views/presence_v1')
}


exports.presence_v2 = (req, res) => {

  res.render("user_admin/views/presence_v2", {
    page_title: "PRESENCE"
  });
};
