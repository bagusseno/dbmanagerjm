'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'member_meta_option'
var member_meta_index_model = require('./member_meta_index_model.js')

knex.init_default(exports, table_name)

exports.get_all_by_user_id = async (user_id) => {

    return knex(table_name)
    .select(table_name + ".*")
    .join('member_meta_index', function() {
        this.on('member_meta_index.id', '=', table_name + '.member_meta_index_id')
        .andOn('member_meta_index.user_id', '=', user_id)
    })
    .catch((e) => {

        console.log(e);
        return false
    })
}
