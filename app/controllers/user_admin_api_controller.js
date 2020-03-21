'use strict'

var presence_model = require('../models/presence_model.js')
var audience_meta_value_model = require('../models/audience_meta_value_model.js')
var audience_model = require('../models/audience_model.js')

exports.presence = async (req, res) => {
    
    logger.info('New presence API request', req)

    if(req.body.registration_state == 'update') {

        if(isset(req.body.event_id, req.body.audience_id, req.body.status, req.body.audience_meta_values)) {

            var presence_query = await presence_model.add({
                event_id: req.body.event_id,
                audience_id: req.body.audience_id,
                status: req.body.status
            })

            if(!presence_query) {

                res.api.die('ERR_UAAC_FAIL_ADDING_PRESENCE')
            }

            var update_name_query = await audience_model.update(req.body.audience_id, {
                name: req.body.name
            })

            if(!update_name_query)
                res.api.die('ERR_UAAC_FAIL_UPDATING_AUDIENCE_NAME')

            // update data
            req.body.audience_meta_values.forEach(async (row) => {

                var update_query = await audience_meta_value_model.update_where({
                    audience_meta_index_id: row.audience_meta_index_id,
                    audience_id: req.body.audience_id
                }, {
                    value: row.value
                })

                if(!update_query)
                    res.api.die('ERR_UAAC_FAIL_UPDATING_AUDIENCE_META_VALUES')
            })
            
            res.api.set_status(true)
            res.api.send_json()
        }

    } else if(req.body.registration_state == 'register') {

        // inserting new audience
        var audience_id = await audience_model.add({
            user_id: req.get_current_user().id,
            name: req.body.name
        })
        
        if(!audience_id)
            res.api.die('ERR_UAAC_FAIL_ADDING_AUDIENCE')

        if(req.body.audience_meta_values != null) {
            
            for(var i = 0; i < req.body.audience_meta_values.length; i++) {
                
                var audience_meta_value_query = await audience_meta_value_model.add({
                    audience_id: audience_id,
                    audience_meta_index_id: req.body.audience_meta_values[i].audience_meta_index_id,
                    value: req.body.audience_meta_values[i].value
                })

                if(!audience_meta_value_query)
                    res.api.die('ERR_UAAC_FAIL_ADDING_META_VALUES')
            }
        }
        // end inserting audience

        var presence_query = await presence_model.add({
            event_id: req.body.event_id,
            audience_id: audience_id,
            status: req.body.status
        })

        if(!presence_query)
            res.api.die('ERR_UAAC_FAIL_ADDING_PRESENCE')
        
        res.api.send_json()
    }
}