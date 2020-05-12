'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'member_meta_index'

knex.init_default(exports, table_name)

exports.get_all = async () => {

    return knex(table_name).orderBy('order').catch((e) => {

        console.log(e);
        logger.err('ERR GET ALL: ' + e)

        return false
    })
}