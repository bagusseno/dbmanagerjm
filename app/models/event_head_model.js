'use strict'

var knex = require('../libs/db_lib.js')
var table_name = 'event_head'

knex.init_default(exports, table_name)

exports.get_all_by_user_id = (user_id) => {

    return knex(table_name).where('user_id', user_id)
}

exports.get_by_id = (id) => {

    return knex(table_name).where('id', id)
}