'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'member'
var member_meta_index_model = require('./member_meta_index_model.js')

knex.init_default(exports, table_name)
