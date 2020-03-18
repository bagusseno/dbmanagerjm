'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'audience_meta_value'

knex.init_default(exports, table_name)

exports.get_all_by_event_head_id = (event_head_id) => {

    return knex(table_name).transacting(trx).where('event_head_id', event_head_id)
}