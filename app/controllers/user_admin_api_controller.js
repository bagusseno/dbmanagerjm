'use strict'

var presence_model = require('../models/presence_model.js')
var audience_meta_value_model = require('../models/audience_meta_value_model.js')

exports.presence = async (req, res) => {

    if(isset(req.body.event_id, req.body.audience_id, req.body.status, req.body.audience_meta_values)) {

        var response = {
            status: null,
            err: [],
        }

        var query = await presence_model.add({
            event_id: req.body.event_id,
            audience_id: req.body.audience_id,
            status: req.body.status
        })

        if(query) {

            response.status = true

            // update data
            var update_query_status = true;

            for(var row in req.body.audience_meta_values) {

                var update_query = await audience_meta_value_model.update(row.id, row.value)

                if(!update_query) {

                    update_query_status = false
                    array_push(response.err, 'fail updating audience meta value, id: ' + row.id + ' | value: ' + row.value)
                }
            }
        }   
        
        res.send(response)
    }
}