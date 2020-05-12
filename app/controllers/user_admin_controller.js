'use strict'

var fs = require('fs')
var csv_string = require('csv-string')

var member_model = require('../models/member_model.js')
var member_meta_option_model = require('../models/member_meta_option_model.js')
var member_meta_index_model = require('../models/member_meta_index_model.js')
var member_meta_value_model = require('../models/member_meta_value_model.js')

exports.manage_all_members = async (req, res) => {

    if (req.method == 'POST') {

        console.log(req.file);

        // API: Create
        switch (req.body.action) {

            case 'create':

                console.log("POST CREATE MEMBER");

                if (isset(req.body.name)) {

                    var member_id = await member_model.add({
                        name: req.body.name,
                        family_head_id: req.body.family_head_id
                    })

                    if (member_id)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if (member_id && req.body.member_meta_values != null) {

                        console.log("mbm meta values");
                        
                        for (var i = 0; i < req.body.member_meta_values.length; i++) {

                            var member_meta_value_query = await member_meta_value_model.add({
                                member_id: member_id,
                                member_meta_index_id: req.body.member_meta_indexes[i],
                                value: req.body.member_meta_values[i]
                            })

                            console.log(req.body.member_meta_values[i]);
                            console.log(req.body.member_meta_indexes[i]);

                            if (!member_meta_value_query) {

                                req.flash('query_status', 'failed at meta values')
                                console.log("FAILED");
                            }
                        }
                    }
                }

                break

            case 'update':

                if (isset(req.body.id, req.body.name)) {

                    var member_meta_indexes = await member_meta_index_model.get_all()

                    var query = await member_model.update(req.body.id, {
                        user_id: req.get_current_user().id,
                        name: req.body.name
                    })

                    if (query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if (query && req.body.member_meta_values != null) {

                        for (var i = 0; i < req.body.member_meta_values.length; i++) {

                            var member_meta_value_query = await member_meta_value_model.update_where({
                                member_meta_index_id: req.body.member_meta_indexes[i],
                                member_id: req.body.member_id
                            }, {
                                member_id: member_id,
                                member_meta_index_id: req.body.member_meta_indexes[i],
                                value: req.body.member_meta_values[i]
                            })

                            if (!member_meta_value_query)
                                req.flash('query_status', 'fail updating meta values')
                        }
                    }
                }

                break

            case 'delete':

                if (isset(req.body.id)) {

                    var query = await member_model.remove(req.body.id)

                    if (query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if (query) {

                        var member_meta_values_query = await member_meta_value_model.remove_where({
                            member_id: req.body.id
                        })  

                        if (!member_meta_values_query)
                            req.flash('query_status', 'failed removing meta values')
                    }
                }

            case 'upload_member_csv':

                console.log('ENTETEDDD');
                if (isset(req.body.member_meta_indexes_order)) {

                    console.log(req.files);

                    fs.readFile(req.files[0].path, async (readFile_err, member_data) => {
                        
                        if (readFile_err) console.log(readFile_err);

                        member_data = csv_string.parse(member_data.toString())

                        member_meta_indexes = await member_meta_index_model.get_all()
                        var member_meta_indexes_order = req.body.member_meta_indexes_order.split(',')

                        var member_meta_index_ids_order = []
                        var current_family_head_id, current_family_head

                        for (var i = 0; i < member_meta_indexes_order.length; i++) {

                            for (var j = 0; j < member_meta_indexes.length; j++) {

                                if (member_meta_indexes_order[i] == member_meta_indexes[j].name) {

                                    member_meta_index_ids_order[i] = member_meta_indexes[j].id
                                    continue
                                }
                            }
                        }

                        console.log(member_meta_index_ids_order);

                        for (var i = 0; i < member_data.length; i++) {

                            var member_data_row = member_data[i]
                            var family_head_id = 0

                            // set the address the same as its KK if it's NOT KK
                            if (member_data_row[2].toLowerCase() != "kk" && member_data_row[2].toLowerCase() != "" && current_family_head != undefined) {

                                member_data_row[4] = current_family_head[4]
                                family_head_id = current_family_head_id
                            }

                            // insert the name first
                            var member_id = await member_model.add({
                                name: member_data_row[0],
                                family_head_id: family_head_id
                            })
                            
                            // set current data if it's a KK. It's duplicated since it needs member_id which
                            // obtained from the query function above
                            if (member_data_row[2].toLowerCase() == "kk") {

                                current_family_head = member_data_row
                                current_family_head_id = member_id
                            }

                            if (!member_id)
                                res.api.die('err_add_member')
                            
                            for (var j = 0; j < member_meta_index_ids_order.length; j++) {
                                
                                var member_meta_value_query = await member_meta_value_model.add({
                                    member_id: member_id,
                                    member_meta_index_id: member_meta_index_ids_order[j],
                                    value: member_data_row[j] // since meta values start after the name column (standardization)
                                })

                                if (!member_meta_value_query)
                                    req.flash('query_status', 'failed when adding meta value')
                            }
                        }
                    })
                }

                break
        }
    }

    var member_meta_indexes = await member_meta_index_model.get_all()
    var member_meta_options = await member_meta_option_model.get_all()
    var member_data = await member_model.get_all_sorted_by_family()

    res.render("user_admin/managements/manage_all_members", {
        page_title: "Manage All member",
        member_meta_indexes: member_meta_indexes,
        member_meta_options: member_meta_options,
        member_data: member_data,
        req: req
    });
}

exports.manage_member = async (req, res) => {

    if (req.method == 'POST') {

        // API: Create
        switch (req.body.action) {

            case 'create':

                if (isset(req.body.member_head_id, req.body.name)) {

                    var member_id = await member_model.add({
                        user_id: req.get_current_user().id,
                        name: req.body.name
                    })

                    if (member_id)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if (member_id && req.body.member_meta_values != null) {

                        for (var i = 0; i < req.body.member_meta_values.length; i++) {

                            var member_meta_value_query = await member_meta_value_model.add({
                                member_id: member_id,
                                member_meta_index_id: req.body.member_meta_indexes[i],
                                value: req.body.member_meta_values[i]
                            })

                            if (!member_meta_value_query)
                                req.flash('query_status', 'failed at meta values')
                        }
                    }
                }

                break

            case 'update':

                if (isset(req.body.id, req.body.member_head_id, req.body.name)) {

                    var query = await member_model.update(req.body.id, {
                        user_id: req.get_current_user().id,
                        name: req.body.name
                    })

                    if (query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if (query && req.body.member_meta_values != null) {

                        for (var i = 0; i < req.body.member_meta_values.length; i++) {

                            var member_meta_value_query = await member_meta_value_model.update_where({
                                member_meta_index_id: req.body.member_meta_indexes[i],
                                member_id: req.body.member_id
                            }, {
                                member_id: member_id,
                                member_meta_index_id: req.body.member_meta_indexes[i],
                                value: req.body.member_meta_values[i]
                            })

                            if (!member_meta_value_query)
                                req.flash('query_status', 'fail updating meta values')
                        }
                    }
                }

                break

            case 'delete':

                if (isset(req.body.id)) {

                    var query = await member_model.remove(req.body.id)

                    if (query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')

                    if (query) {

                        var member_meta_values_query = await member_meta_value_model.remove_where({
                            member_id: req.body.id
                        })

                        if (!member_meta_values_query)
                            req.flash('query_status', 'failed removing meta values')
                    }
                }

        }
    }

    res.render("user_admin/managements/manage_member", {
        page_title: "Manage member",
        req: req
    });
}

exports.manage_all_member_meta_indexes = async (req, res) => {

    if (req.method == 'POST') {

        // API: Create
        switch (req.body.action) {

            case 'create':

                if (isset(req.body.name)) {

                    var query = await member_meta_index_model.add({
                        user_id: req.get_current_user().id,
                        name: req.body.name
                    })

                    if (query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

                break

            case 'update':

                if (isset(req.body.id, req.body.event_head_id, req.body.name)) {

                    var query = await member_meta_index_model.update(req.body.id, {
                        event_head_id: req.body.event_head_id,
                        name: req.body.name
                    })

                    if (query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

                break

            case 'delete':

                if (isset(req.body.id)) {

                    var query = await member_meta_index_model.remove(req.body.id)

                    if (query)
                        req.flash('query_status', 'success')
                    else
                        req.flash('query_status', 'failed')
                }

        }
    }

    var member_meta_indexes = await member_meta_index_model.get_all();

    console.log(member_meta_indexes)

    res.render('user_admin/managements/manage_all_member_meta_indexes', {
        page_title: 'Manage attributes',
        member_meta_indexes: member_meta_indexes,
    })
}

// user public
exports.dashboard = (req, res) => {

    res.render("user_admin/views/dashboard", {
        page_title: "DB Manager Jokam",
        req: req
    });
}

// logout
exports.logout = (req, res) => {

    req.session.current_user = null
    res.redirect('/login')
}

exports.report = async (req, res) => {


}