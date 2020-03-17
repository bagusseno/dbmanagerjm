'use strict'

var presence_model = require('../models/presence_model.js')
var audience_meta_value_model = require('../models/audience_meta_value_model.js')
var audience_model = require('../models/audience_model.js')

exports.presence = async (req, res) => {

    if(req.body.registration_state == 'update') {

        if(isset(req.body.event_id, req.body.audience_id, req.body.status, req.body.audience_meta_values)) {

            var response = {
                status: null,
                err: [],
            }

            var presence_query = await presence_model.add({
                event_id: req.body.event_id,
                audience_id: req.body.audience_id,
                status: req.body.status
            })

            var update_name_query = await audience_model.update(req.body.audience_id, {
                name: req.body.name
            })

            if(presence_query && update_name_query) {

                response.status = true

                // update data
                var update_query_status = true;

                req.body.audience_meta_values.forEach(async (row) => {

                    var update_query = await audience_meta_value_model.custom_update({
                        audience_meta_index_id: row.audience_meta_index_id,
                        audience_id: req.body.audience_id
                    }, {
                        value: row.value
                    })

                    if(!update_query) {

                        update_query_status = false
                        array_push(response.err, 'fail updating audience meta value, id: ' + row.id + ' | value: ' + row.value)
                    }
                })
            }   
            
            res.send(JSON.stringify(response))
        }
    } else if(req.body.registration_state == 'register') {

        var response = {
            status: null,
            err: [],
        }

        // inserting new audience
        var audience_id = await audience_model.add({
            audience_head_id: req.body.audience_head_id,
            name: req.body.name
        })
        
        if(audience_id) {
            req.flash('query_status', 'success')
            response.status = true
        } else
            req.flash('query_status', 'failed')

        if(audience_id && req.body.audience_meta_values != null) {
            
            for(var i = 0; i < req.body.audience_meta_values.length; i++) {
                
                var audience_meta_value_query = await audience_meta_value_model.add({
                    audience_id: audience_id,
                    audience_meta_index_id: req.body.audience_meta_values[i].audience_meta_index_id,
                    value: req.body.audience_meta_values[i].value
                })

                if(!audience_meta_value_query) 
                    req.flash('query_status', 'failed at meta values')
            }
        }
        // end inserting audience

        var presence_query = await presence_model.add({
            event_id: req.body.event_id,
            audience_id: audience_id,
            status: req.body.status
        })
        
        res.send(JSON.stringify(response))
    }
}