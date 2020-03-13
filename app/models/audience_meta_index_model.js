'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'audience_meta_index'

knex.init_default(exports, table_name)

exports.get_all_by_event_head_id = (event_head_id) => {

    return knex(table_name).where('event_head_id', event_head_id)
    .catch((e) => {

        console.log(e);
        return false
    })
}

exports.get_all_by_audience_head_id = (audience_head_id) => {

    return knex(table_name).where('audience_head_id', audience_head_id)
    .catch((e) => {

        console.log(e);
        return false
    })
}