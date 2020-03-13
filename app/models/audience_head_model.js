'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'audience_head'

knex.init_default(exports, table_name)

exports.get_by_id = (id) => {

    return knex(table_name).where('id', event_head_id)
}
