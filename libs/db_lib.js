'use strict'

var knex = require('knex') ({
    client      : 'mysql',
    connection  : {
        host        : 'localhost',
        user        : 'root',
        password    : '',
        database    : 'absensi_jokam' 
    }
})

module.exports = knex

module.exports.init_default = (exports, table_name) => {

    exports.get_all = () => {
        
        return knex(table_name)
    }
    
    exports.add = (data) => {

        return knex(table_name).insert(data)
    }
    
    exports.remove = (id) => {
    
        return knex(table_name).where('id', id).del()
    }
    
    exports.update = (id, data) => {
    
        return knex(table_name).where('id', id).update(data)
    }
}