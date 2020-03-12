'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'user'

knex.init_default(exports, table_name)

exports.get_by_id = (id) => {
    
    return knex(table_name).where('id', id)
}

exports.get_by_credentials = (email, password) => {
    
    return knex(table_name).where({
        'email'  : email,
        'password'  : password
    }).then((rows) => {

        return rows
    })
}
