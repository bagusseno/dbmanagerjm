'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'member_meta_index'

knex.init_default(exports, table_name)

exports.get_all_by_event_head_id = (event_head_id) => {

    return knex(table_name)
    .select(table_name + ".*")
    .join('event_head', 'event_head.user_id', 'member_meta_index.user_id')
    .where('event_head.id', event_head_id)
    .catch((e) => {

        console.log(e);
        return false
    })
}

exports.get_all_by_user_id = (user_id) => {

    return knex(table_name).where('user_id', user_id)
    .catch((e) => {

        console.log(e);
        return false
    })
}