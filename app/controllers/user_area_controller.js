'use strict'

var User_model = require('../models/user_model.js')

exports.get_all = (req, res) => {
    return User_model.get_all().then((rows) => {
        res.json(rows)
    }).catch((e) => {console.log(e)})
}