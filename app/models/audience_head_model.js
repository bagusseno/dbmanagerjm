'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'audience_head'

knex.init_default(exports, table_name)
