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
        .catch((e) => {

            console.log(e);
            return false
        })
    }

    exports.get_by_id = (id) => {

        return knex(table_name).where('id', id)
        .catch((e) => {
    
            console.log(e);
            return false
        })
    }
    
    exports.add = (data) => {

        return knex(table_name).insert(data)
        .catch((e) => {
            
            console.log(e);
            return false
        })
    }
    
    exports.remove = (id) => {
                
        return knex(table_name).where('id', id).del()
        .catch((e) => {
            
            console.log(e);
            return false
        })
    }
    
    exports.update = (id, data) => {
        
        return knex(table_name).where('id', id).update(data)
        .catch((e) => {
            
            console.log(e);
            return false
        })
    }
}