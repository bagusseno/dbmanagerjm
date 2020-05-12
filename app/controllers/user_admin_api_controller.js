'use strict'

var member_meta_value_model = require('../models/member_meta_value_model.js')
var member_model = require('../models/member_model.js')

exports.update_cell = async (req, res) => {

    if(!isset(req.body.member_id, req.body.member_meta_index_id))
        res.api.die("empty_params")

    let query
    if(req.body.member_meta_index_id != "name")
        query = member_meta_value_model.update_where({
            member_id: req.body.member_id,
            member_meta_index_id:  req.body.member_meta_index_id
        }, {
            value: req.body.value
        });
    else
        query = member_model.update_where({
            id: req.body.member_id,
        }, {
            name: req.body.value
        });

    if(query)
        res.final_status(true)
    else
        res.final_status(false)
}

exports.delete_member = async (req, res) => {

    if(!isset(req.body.member_id))
        res.api.die("empty_params")

    if(member_model.remove(req.body.member_id))
        res.api.final_status(true)
    else
        res.api.final_status(false)
}

exports.add_family_member = async (req, res) => {

    if(!isset(req.body.member_id, req.body.candidate_id))
        res.api.die("empty_params")

    let query = member_model.update(req.body.candidate_id, {
        family_head_id: req.body.member_id
    })

    if(query)
        res.final_status(true)
    else
        res.final_status(false)
}

exports.remove_family_head = async (req, res) => {

    if(!isset(req.body.member_id))
        res.api.die("empty_params")

    // check if it has any members
    if(member_model.get_where({family_head_id: req.body.member_id}).length > 0)
        res.api.die("owning_members")

    let query = member_meta_value_model.update_where(
        {
            member_id: req.body.member_id,
            member_meta_index_id: 10
        }, 
        {
            value: ""
        })

    if(query)
        res.final_status(true)
    else
        res.final_status(false)
}

exports.remove_from_family = async (req, res) => {

    if(!isset(req.body.member_id))
        res.api.die("empty_params")

    let query = member_model.update(req.body.member_id, {
        family_head_id: 0
    })

    if(query)
        res.final_status(true)
    else
        res.final_status(false)
}

exports.update_family = async (req, res) => {

    if(!isset(req.body.member_id, req.body.new_parent_id))
        res.api.die("empty_params")

    let query = member_model.update(req.body.member_id, {
        family_head_id: req.body.new_parent_id
    })

    if(query)
        res.final_status(true)
    else
        res.final_status(false)
}

exports.add_member = async (req, res) => {

    if(!isset(req.body.name))
        res.api.die("empty_params")

    // handle metas
    let meta_data = req.body.meta_data

    meta_data.forEach(e => {

        let meta_data_query = member_meta_value_model.add({
            member_id: req.body.member_id,
            member_meta_index_id: e.member_meta_index_id,
            value: e.value
        })

        if(!meta_data_query)
            res.api.die("failed_adding_meta_data", "Fail adding meta data. Member id: " + req.body.member_id + ", member meta index id: " + e.member_meta_index_id + ", value: " + e.value)
    })

    let member_query = member_model.add({
        name: req.body.name
    })

    if(query)
        res.final_status(true)
    else
        res.final_status(false)
}