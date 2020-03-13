'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'event'

knex.init_default(exports, table_name)

exports.get_all_by_event_head_id = (event_head_id) => {

    return knex(table_name).where('event_head_id', event_head_id)
}

exports.get_by_id = (id) => {

    return knex(table_name).where('id', id)
}