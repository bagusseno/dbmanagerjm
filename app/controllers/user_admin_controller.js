'use strict'

var template_engine = require('../libs/template_engine_lib.js')
var User_model = require('../models/user_model.js')

exports.get_all = (req, res) => {
    
    return User_model.get_all()
        .then((rows) => {

        })
        .then(() => {

            return User_model.get_by_id(1)
        })
        .then((rows) => {
            
            template_engine.render('homepage', {title: 'test'}, res)
        })
        .catch((e) => {

            console.log(e); 
        })
}