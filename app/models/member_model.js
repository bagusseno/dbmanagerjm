'use strict'

var knex = require('../../libs/db_lib.js')
var table_name = 'member'
var member_meta_index_model = require('./member_meta_index_model.js')

knex.init_default(exports, table_name)

exports.get_all_with_joins = async () => {

    var member_meta_indexes = await member_meta_index_model.get_all()

    console.log(member_meta_indexes);
    
    var query = knex(table_name)
        .select(table_name + ".*")

        for(var i = 0; i < member_meta_indexes.length; i++) {
            
            console.log(member_meta_indexes[i].name);
            
            var mmv_name = 'mmv' + i
    
            query.select(mmv_name + '.value as ' + member_meta_indexes[i].order + '.id:' + member_meta_indexes[i].id)
    
            query.join('member_meta_value as ' + mmv_name, function() {
                this.on('member.id', '=', mmv_name + '.member_id')
                .andOn(mmv_name + '.member_meta_index_id', '=', member_meta_indexes[i].id)
            })
        }
        
    return query
}

exports.get_all_sorted_by_family = async () => {

    let members = await exports.get_all_with_joins()
    
    if(!isset(members))
        return []

    let groupedMembers = []
    let organized_members = []

    // organize
    groupedMembers = groupBy(members, 'family_head_id')

    groupedMembers["0"].forEach(e => {

        organized_members.push(e)

        if(groupedMembers[e["id"]] != undefined) {

            groupedMembers[e["id"]].forEach(e2 => {

                organized_members.push(e2)
            })
        }
    })
    
    return organized_members
}