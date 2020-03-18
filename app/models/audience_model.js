'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'audience'
var audience_meta_index_model = require('./audience_meta_index_model.js')
var event_head_model = require('./event_head_model.js')

knex.init_default(exports, table_name)

exports.get_all_with_audience_meta_values_by_event_head_id = async (event_head_id) => {
    
    var audience_head_id = await event_head_model.get_by_id(event_head_id)

    console.log(audience_head_id);
    
    if(audience_head_id)
        audience_head_id = audience_head_id.audience_head_id
    
    var audience_meta_indexes = await audience_meta_index_model.get_all_by_audience_head_id(audience_head_id)
    console.log('am' + JSON.stringify(audience_meta_indexes));
    
    var query = knex(table_name)
        .select(table_name + '.*')
        .join('audience_head', 'audience.audience_head_id', 'audience_head.id')
        .join('event_head', 'event_head.audience_head_id', 'audience_head.id')

    for(var i = 0; i < audience_meta_indexes.length; i++) {
        
        var amv_name = 'amv' + i

        query.select(amv_name + '.value as ' + audience_meta_indexes[i].name)

        query.join('audience_meta_value as ' + amv_name, function() {
            this.on('audience.id', '=', amv_name + '.audience_id').andOn(amv_name + '.audience_meta_index_id', '=', audience_meta_indexes[i].id)
        })
    }

    query.where('event_head.id', 2)

    console.log('Q' + query);
    
    return query
}
