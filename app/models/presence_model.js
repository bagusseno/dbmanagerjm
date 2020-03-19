'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'presence'

knex.init_default(exports, table_name)

exports.get_all_by_event_head_id = (event_head_id) => {

    return knex(table_name).where('event_head_id', event_head_id)
}

exports.get_with_audience_meta_by_id = async (id) => {

    var event_head = await event_head_model.get_by_id(event_head_id)

    if(!event_head)
        return false

    audience_head_id = event_head.audience_head_id
    
    var audience_meta_indexes = await audience_meta_index_model.get_all_by_audience_head_id(audience_head_id)
    
    var query = knex(table_name)
        .select(table_name + '.*')

    for(var i = 0; i < audience_meta_indexes.length; i++) {
        
        var amv_name = 'amv' + i

        query.select(amv_name + '.value as ' + audience_meta_indexes[i].name)

        query.join('audience_meta_value as ' + amv_name, function() {
            this.on('audience.id', '=', amv_name + '.audience_id').andOn(amv_name + '.audience_meta_index_id', '=', audience_meta_indexes[i].id)
        })
    }

    query.where('audience.id', id)
    
    return query

}

exports.get_status_by_id = (id) => {

    return knex(table_name).where('id', id).select('status')
}