'use strict'

var config = require('../configs/configs.js').config
var knex = require('knex') (config.development.db)

module.exports = knex

module.exports.init_default = (exports, table_name) => {

    exports.get_all = () => {
        
        return knex(table_name)
        .catch((e) => {

            console.log(e);
            logger.err('ERR GET ALL: ' + e)

            return false
        })
    }

    exports.get_by_id = (id) => {

        return knex(table_name).where('id', id)
            .then((r) => {
                                
                return r[0]
            })
            .catch((e) => {
        
                console.log(e);
                logger.err('ERR GET BY ID: ' + e)

                return false
            })
    }

    exports.get_all_where = (where_query) => {

        return knex(table_name).where(where_query)
            .catch((e) => {
        
                console.log(e);
                logger.err('ERR GET ALL WHERE: ' + e)

                return false
            })
    }
    
    exports.add = (data) => {

        return knex(table_name).insert(data)
            .catch((e) => {
                
                console.log(e);
                logger.err('ERR ADD: ' + e)

                return false
            })
    }
    
    exports.remove = (id) => {
                
        return knex(table_name).where('id', id).del()
            .catch((e) => {
                
                console.log(e);
                logger.err('ERR REMOVE: ' + e)

                return false
            })
    }

    exports.remove_where = (where_query) => {

        return knex(table_name).where(where_query).del()
            .catch((e) => {
                
                console.log(e);
                logger.err('ERR REMOVE WHERE: ' + e)

                return false
            })
    }
    
    exports.update = (id, data) => {
        
        return knex(table_name).where('id', id).update(data)
            .catch((e) => {
                
                console.log(e);
                logger.err('ERR UPDATE: ' + e)

                return false
            })
    }

    exports.update_where = (where_query, data) => {

        return knex(table_name).where(where_query).update(data)
            .catch((e) => {
                
                console.log(e);
                logger.err('ERR UPDATE WHERE: ' + e)

                return false
            })
    }
}